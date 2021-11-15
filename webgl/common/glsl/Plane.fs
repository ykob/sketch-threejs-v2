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

const float duration = 0.24;

float calcStep(float s, float a) {
  return clamp((s - a * (1.0 - duration)) / duration, 0.0, 1.0);
}

#pragma glslify: convertHsvToRgb = require(../../modules/convertHsvToRgb)

void main() {
  vec4 mapM1 = texture2D(normalMap, vUvMask1);
  vec4 mapM2 = texture2D(normalMap, vUvMask2);
  vec4 mapM3 = texture2D(normalMap, vUvMask3);
  vec4 mapM4 = texture2D(normalMap, vUvMask4);
  float step1 = calcStep(stepShow1, mapM1.r) - calcStep(stepHide1, mapM1.r);
  float step2 = calcStep(stepShow2, mapM2.r) - calcStep(stepHide2, mapM2.r);
  float step3 = calcStep(stepShow3, mapM3.r) - calcStep(stepHide3, mapM3.r);
  float step4 = calcStep(stepShow4, mapM4.r) - calcStep(stepHide4, mapM4.r);
  vec3 rgb1 = convertHsvToRgb(vec3(mapM1.g * 0.6 + time * 0.3, 0.8, 0.8));
  vec3 rgb2 = convertHsvToRgb(vec3(mapM2.g * 0.6 + 0.25 + time * 0.3, 0.8, 0.8));
  vec3 rgb3 = convertHsvToRgb(vec3(mapM3.g * 0.6 + 0.5 + time * 0.3, 0.8, 0.8));
  vec3 rgb4 = convertHsvToRgb(vec3(mapM4.g * 0.6 + 0.75 + time * 0.3, 0.8, 0.8));
  vec4 texColor1 = texture2D(texture1, vUv) * step1 + vec4(rgb1, 1.0) * smoothstep(0.0, 0.1, step1) * (1.0 - smoothstep(0.1, 1.0, step1));
  vec4 texColor2 = texture2D(texture2, vUv) * step2 + vec4(rgb2, 1.0) * smoothstep(0.0, 0.1, step2) * (1.0 - smoothstep(0.1, 1.0, step2));
  vec4 texColor3 = texture2D(texture3, vUv) * step3 + vec4(rgb3, 1.0) * smoothstep(0.0, 0.1, step3) * (1.0 - smoothstep(0.1, 1.0, step3));
  vec4 texColor4 = texture2D(texture4, vUv) * step4 + vec4(rgb4, 1.0) * smoothstep(0.0, 0.1, step4) * (1.0 - smoothstep(0.1, 1.0, step4));

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
