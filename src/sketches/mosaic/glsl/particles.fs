precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  vec4 noise = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.1));
  vec2 pointCoord = gl_PointCoord * 2.0 - 1.0;
  float radius = 1.0 - length(pointCoord);
  vec3 color = convertHsvToRgb(
    vec3(
      noise.g,
      1.0,
      0.8
    )
  );
  float opacity = (noise.r * 1.2) * 0.1;

  fragColor = vec4(color, opacity);
}