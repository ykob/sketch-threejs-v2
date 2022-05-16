precision highp float;

uniform float time;
uniform sampler2D tNoise;

varying vec2 vUv;

#pragma glslify: ease = require(glsl-easings/quadratic-out)
#pragma glslify: convertHsvToRgb = require(@ykob/glsl-util/src/convertHsvToRgb)

void main() {
  float showStep = ease(clamp((time - 6.0) / 3.0, 0.0, 1.0));
  float texColorR = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.1 + time * 0.04)).r;
  float texColorG = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.1 + time * 0.04)).g;
  float texColorB1 = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.2 + time * 0.04)).b;
  float texColorB2 = texture2D(tNoise, vec2(vUv.x * 2.0 + 0.5, vUv.y * 0.2 - time * 0.04)).b;
  float stepY = smoothstep(0.0, 0.9, vUv.y) * (1.0 - smoothstep(0.6, 1.0, vUv.y));
  vec3 hsv = vec3(
    0.0 + (texColorB1 + texColorB2) * 0.3,
    0.5,
    1.0
  );
  vec3 rgb = convertHsvToRgb(hsv);
  float opacity = (texColorR + texColorG) / 2.0 * stepY * showStep;

  gl_FragColor = vec4(rgb, opacity);
}
