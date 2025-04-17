precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec2 noiseUv = vec2(vUv.x, vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);
  float circleMask = smoothstep(0.1, 1.0, length(noiseUv * 2.0 - 1.0));
  vec3 glowNoise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.04, 0.0)).rgb;
  vec3 glowNoise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.04, 0.5)).rgb;
  vec3 glowColor = ((glowNoise1 + glowNoise2) - 1.0) * circleMask * 0.48;
  vec3 color = texture(uImageTexture, vUv).rgb + glowColor;

  fragColor = vec4(color, 1.0);
}