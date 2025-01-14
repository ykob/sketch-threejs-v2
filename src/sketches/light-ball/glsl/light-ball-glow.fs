precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec2 uv = (vUv * 2.0 - vec2(1.0));
  vec4 noise1 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(0.0, -0.04));
  vec4 noise2 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(0.04, 0.04));
  vec4 noise3 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(-0.04, 0.04));
  vec3 color = convertHsvToRgb(
    vec3(
      (noise1.x * noise2.y * noise3.z) * 0.2 + 0.1,
      (noise1.x * noise2.y * noise3.z) * -4.0 + 1.2,
      (noise1.x * noise2.y * noise3.z) * 2.0 + 0.4
    )
  ) + (1.0 - pow(smoothstep(0.45, 0.58, length(uv)), 2.0));

  fragColor = vec4(color, pow((1.0 - smoothstep(0.5, 1.0, length(uv))), 9.0));
}