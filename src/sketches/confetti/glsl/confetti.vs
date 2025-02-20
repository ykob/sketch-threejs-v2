uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

in vec3 position;
in vec3 normal;
in mat4 instanceMatrix;

void main() {
  gl_Position = projectionMatrix * viewMatrix * instanceMatrix * modelMatrix * vec4(position, 1.0);
}
