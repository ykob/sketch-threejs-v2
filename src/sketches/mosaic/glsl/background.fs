precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noise = texture(uNoiseTexture, vUv * vec2(0.5, 2.0) + vec2(0.0, uTime * 0.02)).r;
  vec3 color = convertHsvToRgb(
    vec3(
      noise * 4.0 + uTime * 0.2,
      0.6,
      0.27 - (sin(radians(noise * 1200.0 + uTime * 120.0)) * 0.5 + 0.5) * 2.0
    )
  );

  fragColor = vec4(color, 1.0);
}