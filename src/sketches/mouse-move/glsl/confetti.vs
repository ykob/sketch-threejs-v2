uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec3 position;
in vec3 normal;
in vec2 uv;
in vec2 textureIndex;
in float opacity;
in mat4 instanceMatrix;

out float vDistanceToCamera;
out vec2 vUv;
out float vOpacity;

void main() {
  vec4 worldPosition = instanceMatrix * modelMatrix * vec4(position, 1.0);

  vDistanceToCamera = length(cameraPosition - worldPosition.xyz);
  vUv = uv * 0.5 + textureIndex * 0.5;
  vOpacity = opacity;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
