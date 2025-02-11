uniform vec3 cameraPosition;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPixelRatio;
uniform vec2 uResolution;

in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float distanceFromCamera = 20.0 / length(mvPosition.xyz);

  vUv = uv;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = distanceFromCamera * uResolution.y / 200.0 * uPixelRatio;
}
