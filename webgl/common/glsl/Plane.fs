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

const float duration1 = 0.13;
const float duration2 = 0.39;

#pragma glslify: ease = require(glsl-easings/quadratic-out)
#pragma glslify: convertHsvToRgb = require(../../modules/convertHsvToRgb)

float calcStep(float s, float a, float d) {
  return ease(clamp((s - a * (1.0 - d)) / d, 0.0, 1.0));
}

vec4 calcColor(vec2 uv, float stepShow, float stepHide, sampler2D texture) {
  vec2 p = vUv * 2.0 - 1.0;
  vec4 mapM = texture2D(normalMap, uv);
  float trasStep1 = calcStep(stepShow, mapM.r, duration1) - calcStep(stepHide, mapM.r, duration1);
  float trasStep2 = calcStep(stepShow, mapM.r, duration2) - calcStep(stepHide, mapM.r, duration2);
  vec3 rgb = convertHsvToRgb(vec3(mapM.g * 0.4 + time * 0.3, 1.0, 0.45));
  vec2 uvDiff = vec2(cos(radians(mapM.r * 720.0)), sin(radians(mapM.r * 720.0))) * (1.0 - trasStep2) * 0.5 + p * (stepShow - 1.0 + stepHide) * 0.1;
  vec4 texColor = texture2D(texture, vUv + uvDiff) * trasStep1;
  vec4 dissolveEdge = vec4(rgb, 1.0) * smoothstep(0.0, 0.1, trasStep1) * (1.0 - smoothstep(0.1, 1.0, trasStep1));
  return texColor + dissolveEdge;
}

void main() {
  vec4 texColor1 = calcColor(vUvMask1, stepShow1, stepHide1, texture1);
  vec4 texColor2 = calcColor(vUvMask2, stepShow2, stepHide2, texture2);
  vec4 texColor3 = calcColor(vUvMask3, stepShow3, stepHide3, texture3);
  vec4 texColor4 = calcColor(vUvMask4, stepShow4, stepHide4, texture4);

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
