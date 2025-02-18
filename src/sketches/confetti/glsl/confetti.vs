uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

in vec3 position;
in vec3 normal;
in mat4 instanceMatrix;

void main() {
  gl_Position = projectionMatrix * instanceMatrix * modelViewMatrix * vec4(position, 1.0);
}
