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

  vec4 dissolveNoise1 = texture(uNoiseTexture, noiseUv + vec2(uTime * 0.4, 0.0));
  vec4 dissolveNoise2 = texture(uNoiseTexture, noiseUv + vec2(uTime * -0.4, 0.5));
  float dissolveMaskShow = 1.0 - smoothstep(
    uStepShow * 3.0 - 1.5,
    uStepShow * 3.0,
    ((dissolveNoise1.r + dissolveNoise2.g) - 1.0) * 0.5 + length(noiseUv * 2.0 - 1.0)
    );
  float dissolveMaskHide = 1.0 - smoothstep(
    uStepHide * 3.0 - 1.5,
    uStepHide * 3.0,
    ((dissolveNoise1.r + dissolveNoise2.g) - 1.0) * 0.5 + length(noiseUv * 2.0 - 1.0)
    );
  float dissolve = smoothstep(
    0.0,
    1.0,
    dissolveMaskShow * (1.0 - dissolveMaskHide)
    );
  float glowNoise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.4, 0.0)).r;
  float glowNoise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.4, 0.5)).g;
  vec3 glowColor = convertHsvToRgb(
    vec3(
      glowNoise1 + glowNoise2,
      smoothstep(0.5, 0.55, dissolve) * 0.8,
      1.0 - smoothstep(0.6, 1.0, dissolve)
      )
    );

  vec2 colorUv = vec2(
    vUv.x / (16.0 / 9.0) * uAspectRatio.x + (1.0 - (1.0 / (16.0 / 9.0) * uAspectRatio.x)) * 0.5,
    vUv.y
  ) + (vec2(dissolveNoise1.gb + dissolveNoise2.rb) - 1.0) * (1.0 - dissolve) * 2.0;
  vec3 color = texture(uImageTexture, colorUv).rgb * dissolve - glowColor;

  if (dissolve < 0.5) {
    discard;
  }

  fragColor = vec4(color, 1.0);
}