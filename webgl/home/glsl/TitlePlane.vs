precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float time;
uniform float alphaIndex;
uniform sampler2D tNoise;

varying vec2 vUv;

void main(void) {
  vec2 transformedUV = uv * vec2(1.0, 0.5) * 1.0 / 6.0 + vec2(alphaIndex / 6.0, time * 0.02);

  vec3 transformed = position;
  vec4 noise = texture2D(tNoise, transformedUV);
  transformed += vec3(
    cos(noise.r * radians(360.0)) * 5.0,
    sin(noise.g * radians(360.0)) * 5.0,
    (noise.b * 2.0 - 1.0) * 12.0 + floor(alphaIndex / 2.0) * (mod(alphaIndex, 2.0) * 2.0 - 1.0) * 10.0
  ) * smoothstep(0.75, 1.0, sin(radians((uv.x + (noise.r * 2.0 - 1.0) * 0.2) * 240.0 + 180.0 - time * 30.0))) + alphaIndex * 0.01;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * mvPosition;
}
