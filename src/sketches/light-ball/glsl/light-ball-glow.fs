precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec2 uv = (vUv * 2.0 - vec2(1.0));
  vec4 noise1 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(0.0, -0.06));
  vec4 noise2 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(0.06, 0.06));
  vec4 noise3 = texture(uNoiseTexture, normalize(uv) + uTime * vec2(-0.06, 0.06));
  float edge = smoothstep(
    0.2,
    0.8,
    (1.0 - smoothstep(0.4, 0.7, length(uv)))
      + (noise1.x * noise2.y * noise3.z)) * (1.0 - smoothstep(0.5, 1.0, length(uv))
  );
  vec3 color = convertHsvToRgb(
    vec3(
      0.1,
      1.0 - edge * 0.6,
      0.8 + edge
    )
  );

  fragColor = vec4(color, edge);
}