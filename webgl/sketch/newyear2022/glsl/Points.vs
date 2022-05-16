attribute vec3 position;
attribute float size;
attribute float delay;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float time;
uniform sampler2D tNoise;
uniform vec2 resolution;

varying vec3 vColor;

// Fog
varying float fogDepth;

#pragma glslify: convertHsvToRgb = require(@ykob/glsl-util/src/convertHsvToRgb)

void main() {
  vec2 transformedUV = position.xy / 10.0 + vec2(time * -0.08);
  vec4 noise = texture2D(tNoise, transformedUV);

  vec3 transformed = position;
  transformed += vec3(0.0, 0.0, sin(time * 0.7 + position.x + position.y) * 0.3);
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  float distanceFromCamera = length(mvPosition.xyz);
  float pointSize = size * 100.0 / distanceFromCamera * resolution.y / 1024.0;

  // Fog
  fogDepth = -mvPosition.z;

  vec3 hsv = vec3(
    0.0 + noise.r * 0.24,
    0.9 - noise.g * 0.7,
    clamp(time - delay, 0.0, 1.0) - noise.b * 1.8
  );
  vColor = convertHsvToRgb(hsv);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
