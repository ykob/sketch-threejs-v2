precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noiseR = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.02)).r;
  float noiseG = texture(uNoiseTexture, vUv + uTime * vec2(-0.02, 0.01)).g;
  float noiseB = texture(uNoiseTexture, vUv + uTime * vec2(0.02, 0.01)).b;
  vec3 color = convertHsvToRgb(vec3((noiseR + noiseG + noiseB) * 0.46 + vUv.x + uTime * 0.04, 0.3, 0.44 * vEdge));

  fragColor = vec4(color, 1.0);
}