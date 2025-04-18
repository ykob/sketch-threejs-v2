precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec2 noiseUv = vec2(vUv.x, vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);

  float dissolveMaskShow = 1.0 - smoothstep(
    -1.0 + uTime,
    0.0 + uTime,
    length(noiseUv * 2.0 - 1.0)
    );
  float dissolveMaskHide = 1.0 - smoothstep(
    -2.0 + uTime,
    -1.0 + uTime,
    length(noiseUv * 2.0 - 1.0)
    );
  float dissolveNoise1 = texture(uNoiseTexture, noiseUv + vec2(uTime * 0.04, 0.0)).r;
  float dissolveNoise2 = texture(uNoiseTexture, noiseUv + vec2(uTime * -0.04, 0.5)).g;
  float dissolve = smoothstep(
    0.0,
    1.0,
    ((dissolveNoise1 + dissolveNoise2) - 1.0) * 0.8 + dissolveMaskShow * (1.0 - dissolveMaskHide) * 1.8
    );
  
  float glowNoise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.04, 0.0)).r;
  float glowNoise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.04, 0.5)).g;
  vec3 glowColor = convertHsvToRgb(
    vec3(
      glowNoise1 + glowNoise2,
      smoothstep(0.5, 0.55, dissolve) * 0.5,
      1.0 - smoothstep(0.5, 0.7, dissolve)
      )
    );

  vec3 color = texture(uImageTexture, vUv).rgb * dissolve + glowColor;

  if (dissolve < 0.5) {
    discard;
  }

  fragColor = vec4(color, 1.0);
}