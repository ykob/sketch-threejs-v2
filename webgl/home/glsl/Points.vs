attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float time;
uniform float pixelRatio;
uniform sampler2D tNoise;

varying vec3 vColor;

// Fog
varying float fogDepth;

#pragma glslify: convertHsvToRgb = require(../../modules/convertHsvToRgb)

void main() {
  vec2 transformedUV = position.xz / 100.0 + vec2(0.0, time * 0.04);
  vec4 noise = texture2D(tNoise, transformedUV);

  vec3 transformed = position;
  transformed += vec3(0.0, sin(time * 0.7 + position.x + position.z) * 0.3, 0.0);
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  float distanceFromCamera = length(mvPosition.xyz);
  float pointSize = pixelRatio * 150.0 / distanceFromCamera;

  // Fog
  fogDepth = -mvPosition.z;

  vec3 hsv = vec3(
    0.26 + noise.r * 0.6,
    0.9 - noise.g * 0.6,
    0.9 - noise.b * 0.8
  );
  vColor = convertHsvToRgb(hsv);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
