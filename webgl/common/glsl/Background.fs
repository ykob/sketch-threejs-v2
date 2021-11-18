precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(texture, vUv);

  gl_FragColor = texColor - texColor * sin(radians(time * 360.0 * 0.5)) * 0.1;
}
