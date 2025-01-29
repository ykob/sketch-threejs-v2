uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;
uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec3 position;
in vec3 normal;
in vec2 uv;

out vec2 vUv;
out float vEdge;

void main() {
  float angleToCamera = acos(
    dot(normalize(cameraPosition), normalMatrix * normal)
  );

  vUv = uv;
  vEdge = abs(sin(angleToCamera));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
