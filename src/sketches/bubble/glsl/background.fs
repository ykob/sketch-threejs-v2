precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noiseR = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(0.0, -0.02)).r;
  float noiseG = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(-0.02, 0.01)).g;
  float noiseB = texture2D(uNoiseTexture, vUv * vec2(2.0, 1.0) + uTime * vec2(0.02, 0.01)).b;
  vec3 color = convertHsvToRgb(vec3((noiseR + noiseG + noiseB) * 0.36 + uTime * 0.04, 0.8, 0.28 * vEdge));

  gl_FragColor = vec4(color, 1.0);
}