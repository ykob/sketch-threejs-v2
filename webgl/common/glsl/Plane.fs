precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;
uniform float durationAll;
uniform float timeShow1;
uniform float timeShow2;
uniform float timeShow3;
uniform float timeShow4;
uniform float timeHide1;
uniform float timeHide2;
uniform float timeHide3;
uniform float timeHide4;

varying vec2 vUv;

const float duration = 1.0;

float calcStep(float time, vec2 p) {
  return clamp((time - abs(p.x) * (durationAll - duration)) / duration, 0.0, 1.0);
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float step1 = calcStep(timeShow1, p) - calcStep(timeHide1, p);
  float step2 = calcStep(timeShow2, p) - calcStep(timeHide2, p);
  float step3 = calcStep(timeShow3, p) - calcStep(timeHide3, p);
  float step4 = calcStep(timeShow4, p) - calcStep(timeHide4, p);
  vec4 texColor1 = texture2D(texture1, vUv) * step1;
  vec4 texColor2 = texture2D(texture2, vUv) * step2;
  vec4 texColor3 = texture2D(texture3, vUv) * step3;
  vec4 texColor4 = texture2D(texture4, vUv) * step4;

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
