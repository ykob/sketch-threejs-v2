precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec4 noise1 = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.01));
  vec4 noise2 = texture(uNoiseTexture, vUv + uTime * vec2(0.01, 0.01));
  vec4 noise3 = texture(uNoiseTexture, vUv + uTime * vec2(-0.01, 0.01));
  vec3 color = convertHsvToRgb(
    vec3(
      (noise1.x * noise2.y * noise3.z) * 0.6 + 0.3,
      0.48,
      (noise1.x * noise2.y * noise3.z) * 0.3 + 0.3 * vEdge
    )
  );

  fragColor = vec4(color, 1.0);
}