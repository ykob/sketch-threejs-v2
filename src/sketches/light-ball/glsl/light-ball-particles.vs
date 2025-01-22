uniform vec3 cameraPosition;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uResolution;

in vec3 position;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float distanceFromCamera = 20.0 / length(mvPosition.xyz);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = distanceFromCamera * uResolution.y / 300.0;
}