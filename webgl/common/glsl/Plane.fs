precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;
uniform float stepShow1;
uniform float stepShow2;
uniform float stepShow3;
uniform float stepShow4;
uniform float stepHide1;
uniform float stepHide2;
uniform float stepHide3;
uniform float stepHide4;

varying vec2 vUv;

void main() {
  float step1 = stepShow1 - stepHide1;
  float step2 = stepShow2 - stepHide2;
  float step3 = stepShow3 - stepHide3;
  float step4 = stepShow4 - stepHide4;
  vec4 texColor1 = texture2D(texture1, vUv) * step1;
  vec4 texColor2 = texture2D(texture2, vUv) * step2;
  vec4 texColor3 = texture2D(texture3, vUv) * step3;
  vec4 texColor4 = texture2D(texture4, vUv) * step4;

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
