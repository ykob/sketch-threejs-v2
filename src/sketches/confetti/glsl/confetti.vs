uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec3 position;
in vec3 normal;
in mat4 instanceMatrix;

out float distanceToCamera;

void main() {
  vec4 worldPosition = instanceMatrix * modelMatrix * vec4(position, 1.0);

  distanceToCamera = length(cameraPosition - worldPosition.xyz);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
