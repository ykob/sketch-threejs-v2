precision highp float;

uniform float time;
uniform float noiseStrength;
uniform float alphaIndex;
uniform sampler2D tNoise;
uniform sampler2D tTitleFill;
uniform sampler2D tTitleBorder;

varying vec2 vUv;
varying float vDistortStrength;

#pragma glslify: convertHsvToRgb = require(../../modules/convertHsvToRgb)
#pragma glslify: randomNoise = require(../../modules/randomNoise)

void main() {
  vec2 uvNoise = texture2D(tNoise, vUv * vec2(1.0, 0.5) * 1.1 + vec2(alphaIndex, time * 0.1)).rg * 2.0 - 1.0;
  float uvNoise2 = pow(texture2D(tNoise, vUv * vec2(1.0, 0.5) * 0.6 + vec2(0.0, time * 0.8)).b, 4.0);
  vec2 uv = vUv + uvNoise * uvNoise2 * noiseStrength * 0.4;

  float alpha1 = texture2D(tTitleFill, uv).r * (1.0 - step(1.0, alphaIndex));
  float alpha2 = texture2D(tTitleFill, uv).g * step(1.0, alphaIndex) * (1.0 - step(2.0, alphaIndex));
  float alpha3 = texture2D(tTitleFill, uv).b * step(2.0, alphaIndex) * (1.0 - step(3.0, alphaIndex));
  float alpha4 = texture2D(tTitleBorder, uv).r * step(3.0, alphaIndex) * (1.0 - step(4.0, alphaIndex));
  float alpha5 = texture2D(tTitleBorder, uv).g * step(4.0, alphaIndex) * (1.0 - step(5.0, alphaIndex));
  float alpha6 = texture2D(tTitleBorder, uv).b * step(5.0, alphaIndex);
  float alpha = alpha1 + alpha2 + alpha3 + alpha4 + alpha5 + alpha6;

  float whiteNoise = randomNoise(vUv, sin(time));
  float whiteNoise2 = randomNoise(vec2(0.0, vUv.y * 0.1 + sin(time)), 1.0);
  float colorNoise1 = texture2D(tNoise, vUv * vec2(1.0, 0.5) * 0.5 + vec2(0.0, time * 0.02)).r;
  float colorNoise2 = texture2D(tNoise, vUv * vec2(1.0, 0.5) * 0.5 + vec2(0.0, time * -0.024)).g;
  float colorNoise3 = texture2D(tNoise, vUv * vec2(1.0, 0.5) + vec2(0.0, time * 0.024)).b;

  vec3 hsv = vec3(
    0.42 + (colorNoise1 + colorNoise2) * 0.2 - vDistortStrength * 0.34,
    0.9 - colorNoise3 * 0.6 - vDistortStrength * 0.24,
    0.8 + colorNoise3 * 0.2 + (whiteNoise + whiteNoise2) * 0.12 + vDistortStrength * 0.24
  );
  vec3 color = convertHsvToRgb(hsv);

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(color, alpha);
}
