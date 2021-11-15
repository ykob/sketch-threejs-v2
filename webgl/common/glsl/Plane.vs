precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform mat3 uvTransform1;
uniform mat3 uvTransform2;
uniform mat3 uvTransform3;
uniform mat3 uvTransform4;

varying vec2 vUv;
varying vec2 vUvMask1;
varying vec2 vUvMask2;
varying vec2 vUvMask3;
varying vec2 vUvMask4;

void main(void) {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vUv = uv;
  vUvMask1 = (uvTransform1 * vec3(uv, 1.0)).xy;
  vUvMask2 = (uvTransform2 * vec3(uv, 1.0)).xy;
  vUvMask3 = (uvTransform3 * vec3(uv, 1.0)).xy;
  vUvMask4 = (uvTransform4 * vec3(uv, 1.0)).xy;

  gl_Position = projectionMatrix * mvPosition;
}
