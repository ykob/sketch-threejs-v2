precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec2 noiseUv = vec2(vUv.x, vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0);
  float circleMask = smoothstep(0.1, 1.0, length(noiseUv * 2.0 - 1.0));
  vec3 noise1 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * 0.04, 0.0)).rgb;
  vec3 noise2 = texture(uNoiseTexture, noiseUv * 0.5 + vec2(uTime * -0.04, 0.5)).rgb;
  vec3 noiseAmount = ((noise1 + noise2) - 1.0) * circleMask;
  vec3 color = texture(uImageTexture, vUv + noiseAmount.rg * 0.08).rgb + noiseAmount * 0.48;

  fragColor = vec4(color, 1.0);
}