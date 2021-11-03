precision highp float;

uniform float alphaIndex;
uniform sampler2D tNoise;
uniform sampler2D tTitleFill;
uniform sampler2D tTitleBorder;

varying vec2 vUv;

void main() {
  float alpha1 = texture2D(tTitleFill, vUv).r * (1.0 - step(1.0, alphaIndex));
  float alpha2 = texture2D(tTitleFill, vUv).g * step(1.0, alphaIndex) * (1.0 - step(2.0, alphaIndex));
  float alpha3 = texture2D(tTitleFill, vUv).b * step(2.0, alphaIndex) * (1.0 - step(3.0, alphaIndex));
  float alpha4 = texture2D(tTitleBorder, vUv).r * step(3.0, alphaIndex) * (1.0 - step(4.0, alphaIndex));
  float alpha5 = texture2D(tTitleBorder, vUv).g * step(4.0, alphaIndex) * (1.0 - step(5.0, alphaIndex));
  float alpha6 = texture2D(tTitleBorder, vUv).b * step(5.0, alphaIndex);
  float alpha = alpha1 + alpha2 + alpha3 + alpha4 + alpha5 + alpha6;

  vec3 color = vec3(0.4, 0.95, 0.95);

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(color, alpha);
}
