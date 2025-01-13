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
  float angleToCamera = acos(dot(normalize(cameraPosition), normalMatrix * normal));
  float noise = texture(uNoiseTexture, normal.xy * 0.04 + uTime * vec2(0.0, -0.04)).r;

  vUv = uv;
  vEdge = pow(abs(sin(angleToCamera)), 4.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normalize(position) * sin(noise) * 0.3, 1.0);
}