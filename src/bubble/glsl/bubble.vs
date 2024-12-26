attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

varying float vEdge;

void main() {
  float angleToCamera = acos(dot(normalize(cameraPosition), (modelMatrix * vec4(normal, 1.0)).xyz));

  vEdge = pow(abs(sin(angleToCamera)), 4.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}