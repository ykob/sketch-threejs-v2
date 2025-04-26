precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noise1 = texture(uNoiseTexture, vUv * vec2(0.2, 8.0) + vec2(uTime * 0.01, 0.0)).r;
  float noise2 = texture(uNoiseTexture, vUv * vec2(0.2, 8.0) + vec2(uTime * -0.01 + 0.5, 0.5)).r;
  vec3 color1 = convertHsvToRgb(
    vec3(
      noise1 * 12.0 + uTime * 0.2,
      0.4,
      0.16 - (sin(radians(noise1 * 720.0 + uTime * 120.0)) * 0.5 + 0.5) * 3.0
    )
  );
  vec3 color2 = convertHsvToRgb(
    vec3(
      noise2 * 12.0 + uTime * 0.2,
      0.4,
      0.16 - (cos(radians(noise2 * 720.0 + uTime * 120.0)) * 0.5 + 0.5) * 3.0
    )
  );

  fragColor = vec4(color1 + color2, 1.0);
}