attribute vec3 position;
attribute float size;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float time;
uniform sampler2D tNoise;
uniform vec2 resolution;

varying vec3 vColor;

// Fog
varying float fogDepth;

#pragma glslify: convertHsvToRgb = require(../../modules/convertHsvToRgb)

void main() {
  vec2 transformedUV = position.xz / 100.0 + vec2(time * -0.02);
  vec4 noise = texture2D(tNoise, transformedUV);

  vec3 transformed = position;
  transformed += vec3(0.0, sin(time * 0.7 + position.x + position.z) * 0.3, 0.0);
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  float distanceFromCamera = length(mvPosition.xyz);
  float pointSize = size * 100.0 / distanceFromCamera * resolution.y / 1024.0;

  // Fog
  fogDepth = -mvPosition.z;

  vec3 hsv = vec3(
    0.16 + noise.r * 0.6,
    0.9 - noise.g * 0.7,
    1.0 - noise.b * 1.8
  );
  vColor = convertHsvToRgb(hsv);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
