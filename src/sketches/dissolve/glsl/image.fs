precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;
uniform float uStepShow;
uniform float uStepHide;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec2 noiseUv = vec2(vUv.x, vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);

  vec4 dissolveNoise1 = texture(uNoiseTexture, noiseUv + vec2(uTime * 0.04, 0.0));
  vec4 dissolveNoise2 = texture(uNoiseTexture, noiseUv + vec2(uTime * -0.04, 0.5));
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
  float glowNoise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.04, 0.0)).r;
  float glowNoise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.04, 0.5)).g;
  vec3 glowColor = convertHsvToRgb(
    vec3(
      glowNoise1 + glowNoise2,
      smoothstep(0.5, 0.55, dissolve) * 0.8,
      1.0 - smoothstep(0.2, 1.0, dissolve)
      )
    );

  vec2 uv = vUv + (vec2(dissolveNoise1.gb + dissolveNoise2.rb) - 1.0) * (1.0 - dissolve) * 2.0;
  vec3 color = texture(uImageTexture, uv).rgb * dissolve - glowColor;

  if (dissolve < 0.5) {
    discard;
  }

  fragColor = vec4(color, 1.0);
}