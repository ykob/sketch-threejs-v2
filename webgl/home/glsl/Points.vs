attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float pixelRatio;

// Fog
varying float fogDepth;

void main() {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  float distanceFromCamera = length(mvPosition.xyz);
  float pointSize = pixelRatio * 100.0 / distanceFromCamera;

  // Fog
  fogDepth = -mvPosition.z;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}
