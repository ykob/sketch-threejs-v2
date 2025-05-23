precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;
uniform float uStepShow;
uniform float uStepHide;
uniform vec2 uAspectRatio;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec2 noiseUv = vec2(
    vUv.x * min(uAspectRatio.x, 1.0) + (1.0 - min(uAspectRatio.x, 1.0)) * 0.5,
    vUv.y * min(uAspectRatio.y, 1.0) + (1.0 - min(uAspectRatio.y, 1.0)) * 0.5
  );

  vec4 dissolveNoise = texture(uNoiseTexture, noiseUv);
  float dissolveMaskShow = smoothstep(
    1.0,
    1.5,
    uStepShow + dissolveNoise.r
    );
  float dissolveMaskHide = smoothstep(
    1.0,
    1.5,
    uStepHide + dissolveNoise.r
    );
  float dissolve = smoothstep(
    0.0,
    1.0,
    dissolveMaskShow * (1.0 - dissolveMaskHide)
    );
  vec3 edgeGlowColor = convertHsvToRgb(
    vec3(
      dissolveNoise.r * 6.0 + uTime * 120.0,
      0.8,
      1.0 - smoothstep(0.5, 1.0, dissolve) - (1.0 - smoothstep(0.5, 0.7, dissolve)) * 2.5
      )
  );
  vec3 glowColor = convertHsvToRgb(
    vec3(
      dissolveNoise.b * 6.0 + uTime * 0.8,
      0.8,
      0.5 - dissolveNoise.b * 0.5
      )
  );
  vec2 colorUv = vec2(
    vUv.x / (16.0 / 9.0) * uAspectRatio.x + (1.0 - (1.0 / (16.0 / 9.0) * uAspectRatio.x)) * 0.5,
    vUv.y
  );
  vec3 color = texture(
    uImageTexture,
    colorUv
      - vec2(0.0,dissolveNoise.g) * (1.0 - dissolveMaskShow) * 0.25
      + vec2(0.0,dissolveNoise.r) * dissolveMaskHide * 0.25
  ).rgb + edgeGlowColor + glowColor;

  if (dissolve < 0.5) {
    discard;
  }

  fragColor = vec4(color, 1.0);
}