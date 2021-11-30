#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform mat4 viewMatrix;

uniform float shininess;

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D map;
uniform sampler2D normalMap;
uniform vec2 normalScale;

varying vec3 vViewPosition;
varying vec2 vUv;
varying vec3 vNormal;

// Common
#define RECIPROCAL_PI 0.3183098861837907

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};
struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

// Ambient Light
uniform vec3 ambientLightColor;

// Directional Lights
#if NUM_DIR_LIGHTS > 0
  struct DirectionalLight {
    vec3 direction;
    vec3 color;
  };
  uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
#endif

// Point Lights
#if NUM_POINT_LIGHTS > 0
  struct PointLight {
    vec3 position;
    vec3 color;
    float distance;
    float decay;
  };
  uniform PointLight pointLights[NUM_POINT_LIGHTS];

  void getPointDirectLightIrradiance(
    const in PointLight pointLight,
    const in GeometricContext geometry,
    out IncidentLight directLight
  ) {
    vec3 lVector = pointLight.position - geometry.position;
    directLight.direction = normalize(lVector);
    float lightDistance = length(lVector);
    directLight.color = pointLight.color;
    directLight.color *= pow(clamp(-lightDistance / pointLight.distance + 1.0, 0.0, 1.0), pointLight.decay);
  }
#endif

// Diffuse
vec3 calcDiffuse(
  const in GeometricContext geometry,
  const in IncidentLight directLight
) {
  float dotNL = dot(geometry.normal, directLight.direction);
  return directLight.color * clamp(dotNL, 0.0, 1.0);
}

// Specular
vec3 F_Schlick(const in vec3 specularColor, const in float dotLH) {
  float fresnel = exp2((-5.55473 * dotLH - 6.98316) * dotLH);
  return (1.0 - specularColor) * fresnel + specularColor;
}
float D_BlinnPhong(const in float shininess, const in float dotNH) {
  return RECIPROCAL_PI * (shininess * 0.5 + 1.0) * pow(dotNH, shininess);
}
vec3 calcSpecular(
  const in GeometricContext geometry,
  const in IncidentLight directLight
) {
  vec3 halfDir = normalize(directLight.direction + geometry.viewDir);
  float dotNH = clamp(dot(geometry.normal, halfDir), 0.0, 1.0);
  float dotLH = clamp(dot(directLight.direction, halfDir), 0.0, 1.0);
  vec3 F = F_Schlick(vec3(1.0), dotLH);
  float G = 0.25;
  float D = D_BlinnPhong(shininess, dotNH);
  return (F * (G * D));
}

// Perturb Normal
// https://github.com/glslify/glsl-perturb-normal
mat3 cotangent(vec3 N, vec3 p, vec2 uv) {
  // get edge vectors of the pixel triangle
  vec3 dp1 = dFdx(p);
  vec3 dp2 = dFdy(p);
  vec2 duv1 = dFdx(uv);
  vec2 duv2 = dFdy(uv);

  // solve the linear system
  vec3 dp2perp = cross(dp2, N);
  vec3 dp1perp = cross(N, dp1);
  vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
  vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

  // construct a scale-invariant frame 
  float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B)));
  return mat3(normalize(T * invmax), normalize(B * invmax), N);
}
vec3 perturb(vec3 map, vec3 N, vec3 V, vec2 texcoord) {
  mat3 TBN = cotangent(N, -V, texcoord);
  return normalize(TBN * map);
}

// Fog
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
varying float fogDepth;

void main() {
  vec4 diffuseColor = vec4(diffuse, opacity);

  // Map Fragment
  vec4 texelColor = texture2D(map, vUv);
  diffuseColor *= texelColor;

  // Normal with Tangent Space
  vec3 normal = normalize(vNormal);
  vec3 mapN = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
  mapN.xy *= normalScale;
  normal = perturb(mapN, normal, normalize(vViewPosition), vUv);

  // Define geometry
  GeometricContext geometry;
  geometry.position = -vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = normalize(vViewPosition);

  vec3 diffuse;
  vec3 specular;
  vec3 irradiance;
  IncidentLight directLight;

  // Directional Light
  #if NUM_DIR_LIGHTS > 0
    #pragma unroll_loop_start
    for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
      directLight.direction = directionalLights[i].direction;
      directLight.color = directionalLights[i].color;

      // diffuse
      irradiance = calcDiffuse(geometry, directLight);
      diffuse += irradiance * diffuseColor.rgb;

      // specular
      specular += irradiance * calcSpecular(geometry, directLight);
    }
    #pragma unroll_loop_end
  #endif

  // Point Light
  #if NUM_POINT_LIGHTS > 0
    #pragma unroll_loop_start
    for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
      getPointDirectLightIrradiance(pointLights[i], geometry, directLight);

      // diffuse
      irradiance = calcDiffuse(geometry, directLight);
      diffuse += irradiance * diffuseColor.rgb;

      // specular
      specular += irradiance * calcSpecular(geometry, directLight);
    }
    #pragma unroll_loop_end
  #endif

  vec3 light = diffuse + specular + ambientLightColor * diffuseColor.rgb;

  gl_FragColor = vec4(light, diffuseColor.a);

  // Fog
  float fogFactor = smoothstep(fogNear, fogFar, fogDepth);

  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
}
