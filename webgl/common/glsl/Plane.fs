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
uniform float time;
uniform sampler2D normalMap;

varying vec2 vUv;
varying vec2 vUvMask1;
varying vec2 vUvMask2;
varying vec2 vUvMask3;
varying vec2 vUvMask4;

const float duration = 0.2;

float calcStep(float s, float a) {
  return clamp((s - a * (1.0 - duration)) / duration, 0.0, 1.0);
}

void main() {
  vec4 mapN1 = texture2D(normalMap, vUvMask1);
  vec4 mapN2 = texture2D(normalMap, vUvMask2);
  vec4 mapN3 = texture2D(normalMap, vUvMask3);
  vec4 mapN4 = texture2D(normalMap, vUvMask4);
  float step1 = calcStep(stepShow1, mapN1.r) - calcStep(stepHide1, mapN1.r);
  float step2 = calcStep(stepShow2, mapN2.r) - calcStep(stepHide2, mapN2.r);
  float step3 = calcStep(stepShow3, mapN3.r) - calcStep(stepHide3, mapN3.r);
  float step4 = calcStep(stepShow4, mapN4.r) - calcStep(stepHide4, mapN4.r);
  vec4 texColor1 = texture2D(texture1, vUv) * step1 + texture2D(texture1, vUv) * smoothstep(0.0, 0.1, step1) * (1.0 - smoothstep(0.1, 1.0, step1)) * 8.0;
  vec4 texColor2 = texture2D(texture2, vUv) * step2 + texture2D(texture2, vUv) * smoothstep(0.0, 0.1, step2) * (1.0 - smoothstep(0.1, 1.0, step2)) * 8.0;
  vec4 texColor3 = texture2D(texture3, vUv) * step3 + texture2D(texture3, vUv) * smoothstep(0.0, 0.1, step3) * (1.0 - smoothstep(0.1, 1.0, step3)) * 8.0;
  vec4 texColor4 = texture2D(texture4, vUv) * step4 + texture2D(texture4, vUv) * smoothstep(0.0, 0.1, step4) * (1.0 - smoothstep(0.1, 1.0, step4)) * 8.0;

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
