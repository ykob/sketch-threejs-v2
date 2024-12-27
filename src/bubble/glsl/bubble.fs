precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

void main() {
  vec4 noise = texture2D(uNoiseTexture, vUv + uTime * vec2(0.0, 0.1));

  gl_FragColor = vec4(vec3(vEdge * noise), 1.0);
}