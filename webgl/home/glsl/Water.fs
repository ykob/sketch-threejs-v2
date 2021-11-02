precision highp float;

uniform mat4 viewMatrix;

uniform float time;
uniform float shininess;
uniform float reflectivity;
uniform mat4 textureMatrix;
uniform sampler2D tReflectionMap;
uniform sampler2D tRefractionMap;
uniform vec2 resolution;
uniform sampler2D tDepth1;
uniform sampler2D tDepth2;
uniform float cameraNear;
uniform float cameraFar;

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D normalMap;
uniform vec2 normalScale;

varying vec3 vViewPosition;
varying vec3 vToEye;
varying vec2 vUv;
varying vec4 vCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBitangent;

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

// Blending Normal Map
vec3 blendNormalRNM(vec3 n1, vec3 n2) {
  n1 += vec3(0.0, 0.0, 1.0);
  n2 *= vec3(-1.0, -1.0, 1.0);
  return n1 * dot(n1, n2) / n1.z - n2;
}

// Fog
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
varying float fogDepth;

// Depth
float viewZToOrthographicDepth(const in float viewZ, const in float near, const in float far) {
  return (viewZ + near) / (near - far);
}
float perspectiveDepthToViewZ(const in float invClipZ, const in float near, const in float far) {
  return (near * far) / ((far - near) * invClipZ - far);
}
float readDepth(sampler2D depthSampler, vec2 coord) {
  float fragCoordZ = texture2D(depthSampler, coord).x;
  float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
  return viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
}

void main() {
  vec4 diffuseColor = vec4(diffuse, opacity);

  // Normal Map
  vec4 mapN1 = texture2D(normalMap, vUv + time * vec2(0.01, -0.01));
  vec4 mapN2 = texture2D(normalMap, vUv - time * vec2(0.01, -0.01));
  vec3 mapN = blendNormalRNM(mapN1.xyz * 2.0 - 1.0, mapN2.xyz * 2.0 - 1.0);
  mapN.xy *= normalScale;

  // Normal with Tangent Space
  vec3 normal = normalize(vNormal);
  vec3 tangent = normalize(vTangent);
  vec3 bitangent = normalize(vBitangent);
  mat3 vTBN = mat3(tangent, bitangent, normal);
  normal = normalize(vTBN * mapN);

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

  vec3 light = diffuse + specular;

  // Normal for reflect and refract.
  vec4 mapNR = mix(mapN1, mapN2, 0.1);
  vec3 normalR = normalize(vec3(mapNR.r * 2.0 - 1.0, mapNR.b, mapNR.g * 2.0 - 1.0));

  // calculate the fresnel term to blend reflection and refraction maps
  float theta = max(dot(normalize(vToEye), normalR), 0.0);
  float reflectance = reflectivity + (1.0 - reflectivity) * pow((1.0 - theta), 5.0);
  vec3 coord = vCoord.xyz / vCoord.w;
  vec2 uv = coord.xy + coord.z * normalR.xz * 0.15;
  vec4 reflectColor = texture2D(tReflectionMap, vec2(1.0 - uv.x, uv.y));
  vec4 refractColor = texture2D(tRefractionMap, uv) * 0.2;

  // Depth for water's edge
  float depth1 = readDepth(tDepth1, gl_FragCoord.xy / resolution + mapN.xy * 0.06);
  float depth2 = readDepth(tDepth2, gl_FragCoord.xy / resolution + mapN.xy * 0.06);
  float waterEdge = (1.0 - smoothstep(0.0015, 0.003, abs(depth1 - depth2))) * 0.15;

  gl_FragColor = vec4(light, 1.0) + mix(refractColor, reflectColor, reflectance) + waterEdge;

  // Fog
  float fogFactor = smoothstep(fogNear, fogFar, fogDepth);

  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
}
