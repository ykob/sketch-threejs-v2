precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

#pragma glslify: ease = require(glsl-easings/quadratic-out)

void main() {
  float showStep = ease(clamp(time / 1.5, 0.0, 1.0));
  vec4 texColor = texture2D(texture, vUv);

  gl_FragColor = texColor * vec4(vec3(showStep), 1.0);
}
