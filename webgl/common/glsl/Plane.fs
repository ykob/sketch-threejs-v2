precision highp float;

uniform sampler2D normalMap;
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

varying vec2 vUv;

const float duration = 0.3;

float calcStep(float s, float a) {
  return clamp((s - a * (1.0 - duration)) / duration, 0.0, 1.0);
}

void main() {
  vec4 mapN = texture2D(normalMap, vUv + time * vec2(0.0, 0.1));
  float alpha = 1.0 - mapN.r;
  float step1 = calcStep(stepShow1, alpha) - calcStep(stepHide1, alpha);
  float step2 = calcStep(stepShow2, alpha) - calcStep(stepHide2, alpha);
  float step3 = calcStep(stepShow3, alpha) - calcStep(stepHide3, alpha);
  float step4 = calcStep(stepShow4, alpha) - calcStep(stepHide4, alpha);
  vec4 texColor1 = texture2D(texture1, vUv) * step1 + texture2D(texture1, vUv) * smoothstep(0.0, 0.8, step1) * (1.0 - smoothstep(0.7, 1.0, step1)) * 4.0;
  vec4 texColor2 = texture2D(texture2, vUv) * step2 + texture2D(texture2, vUv) * smoothstep(0.0, 0.8, step2) * (1.0 - smoothstep(0.7, 1.0, step2)) * 4.0;
  vec4 texColor3 = texture2D(texture3, vUv) * step3 + texture2D(texture3, vUv) * smoothstep(0.0, 0.8, step3) * (1.0 - smoothstep(0.7, 1.0, step3)) * 4.0;
  vec4 texColor4 = texture2D(texture4, vUv) * step4 + texture2D(texture4, vUv) * smoothstep(0.0, 0.8, step4) * (1.0 - smoothstep(0.7, 1.0, step4)) * 4.0;

  gl_FragColor = texColor1 + texColor2 + texColor3 + texColor4;
}
