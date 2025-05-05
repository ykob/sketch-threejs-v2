precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec3 vPosition;
in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noiseR = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.006)).r;
  float noiseG = texture(uNoiseTexture, vUv + uTime * vec2(-0.006, 0.006)).g;
  float noiseB = texture(uNoiseTexture, vUv + uTime * vec2(0.006, 0.006)).b;
  vec3 color = convertHsvToRgb(
    vec3((noiseR + noiseG + noiseB) * 0.24 + vUv.x + uTime * 0.04,
    0.56,
    0.07 + smoothstep(-20.0, 20.0, vPosition.y) * 0.24
  ));

  fragColor = vec4(color, 1.0);
}