precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;

varying vec2 vUv;

void main() {
  vec4 texColor1 = texture2D(texture1, vUv);
  vec4 texColor2 = texture2D(texture2, vUv);
  vec4 texColor3 = texture2D(texture3, vUv);
  vec4 texColor4 = texture2D(texture4, vUv);

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
