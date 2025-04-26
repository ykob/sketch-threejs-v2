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

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
