attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;
uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

void main() {
  float angleToCamera = acos(dot(normalize(cameraPosition), normalMatrix * normal));

  vUv = uv;
  vEdge = pow(abs(sin(angleToCamera)), 3.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}