precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec4 noise = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.3));
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = 1.0 - length(p);
  vec3 color = convertHsvToRgb(
    vec3(
      0.04 + noise.g * 0.3,
      1.0 - r * 0.5,
      0.8 + r
    )
  );

  fragColor = vec4(color, (r - noise.r * 1.4) * 0.24);
}