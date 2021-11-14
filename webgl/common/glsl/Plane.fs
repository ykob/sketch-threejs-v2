precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;
uniform float durationAll;
uniform float stepShow1;
uniform float stepShow2;
uniform float stepShow3;
uniform float stepShow4;
uniform float stepHide1;
uniform float stepHide2;
uniform float stepHide3;
uniform float stepHide4;

varying vec2 vUv;

const float duration = 0.8;

float calcStep(float s, vec2 p) {
  return clamp((s - abs(p.x) * (1.0 - duration)) / duration, 0.0, 1.0);
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float step1 = calcStep(stepShow1, p) - calcStep(stepHide1, p);
  float step2 = calcStep(stepShow2, p) - calcStep(stepHide2, p);
  float step3 = calcStep(stepShow3, p) - calcStep(stepHide3, p);
  float step4 = calcStep(stepShow4, p) - calcStep(stepHide4, p);
  vec4 texColor1 = texture2D(texture1, vUv + vec2(1.0 - step1) * p * 0.25) * step1;
  vec4 texColor2 = texture2D(texture2, vUv + vec2(1.0 - step2) * p * 0.25) * step2;
  vec4 texColor3 = texture2D(texture3, vUv + vec2(1.0 - step3) * p * 0.25) * step3;
  vec4 texColor4 = texture2D(texture4, vUv + vec2(1.0 - step4) * p * 0.25) * step4;

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
