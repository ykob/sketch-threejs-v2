precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

vec3 convertHsvToRgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float noiseR = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(0.0, -0.02)).r;
  float noiseG = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(-0.02, 0.01)).g;
  float noiseB = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(0.02, 0.01)).b;
  vec3 color = convertHsvToRgb(vec3((noiseR + noiseG + noiseB) * 0.36 + uTime * 0.04, 0.8, 0.28 * vEdge));

  gl_FragColor = vec4(color, 1.0);
}