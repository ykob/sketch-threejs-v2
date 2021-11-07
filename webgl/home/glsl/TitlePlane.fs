precision highp float;

uniform float time;
uniform float noiseStrength;
uniform float alphaIndex;
uniform sampler2D tNoise;
uniform sampler2D tTitleFill;
uniform sampler2D tTitleBorder;

varying vec2 vUv;

void main() {
  vec2 uvNoise = texture2D(tNoise, vUv * vec2(1.0, 0.5) * 1.2 + vec2(alphaIndex, time * 2.01)).rg * 2.0 - 1.0;
  float uvNoise2 = pow(texture2D(tNoise, vUv * vec2(1.0, 0.5) * 0.6 + vec2(0.0, time * 3.01)).b, 4.0);
  vec2 uv = vUv + uvNoise * uvNoise2 * noiseStrength * 0.5;

  float alpha1 = texture2D(tTitleFill, uv).r * (1.0 - step(1.0, alphaIndex));
  float alpha2 = texture2D(tTitleFill, uv).g * step(1.0, alphaIndex) * (1.0 - step(2.0, alphaIndex));
  float alpha3 = texture2D(tTitleFill, uv).b * step(2.0, alphaIndex) * (1.0 - step(3.0, alphaIndex));
  float alpha4 = texture2D(tTitleBorder, uv).r * step(3.0, alphaIndex) * (1.0 - step(4.0, alphaIndex));
  float alpha5 = texture2D(tTitleBorder, uv).g * step(4.0, alphaIndex) * (1.0 - step(5.0, alphaIndex));
  float alpha6 = texture2D(tTitleBorder, uv).b * step(5.0, alphaIndex);
  float alpha = alpha1 + alpha2 + alpha3 + alpha4 + alpha5 + alpha6;

  vec3 color = vec3(0.55, 0.85, 0.88);

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(color, alpha);
}
