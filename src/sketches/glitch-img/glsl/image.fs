precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;
uniform float uTime;

in vec2 vUv;

out vec4 fragColor;

float whiteNoise(vec2 uv) {
  float n = dot(vec2(uv.x, uv.y), vec2(12.9898, 78.233));
  n = fract(sin(n) * 43758.5453);
  return n;
}

void main() {
  float time = floor(uTime * 20.0) / 20.0;
  float noisePower = smoothstep(
    0.7,
    1.0,
    sin(time) * 0.5 + 0.5
  );
  vec2 noiseUv = vec2(
    vUv.x + time * 100.0,
    vUv.y * 9.0 / 16.0 + (1.0 - 9.0 / 16.0) / 2.0
  );
  float glitch = whiteNoise(
    floor(
      noiseUv * vec2(
        0.5 + whiteNoise(vec2(time)) * 1.5,
        1.0 - whiteNoise(vec2(time * 5.0)) * 8.0
      ) * 10.0
    ) / 10.0
  );
  float glitchMask = step(glitch, 0.005 + noisePower * 0.04);
  vec3 color = texture(uImageTexture, vUv).rgb;
  vec3 glitchColor = texture(uImageTexture, vUv + noisePower + 0.1).rgb;

  fragColor = vec4(
    color * (1.0 - glitchMask)
      + (glitchColor) * glitchMask
      - (whiteNoise(vUv + time) * 2.0 - 1.0) * 0.1,
  1.0);
}