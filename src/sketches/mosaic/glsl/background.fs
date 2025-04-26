precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec3 vPosition;
in vec2 vUv;

out vec4 fragColor;

#include ../../../utils/glsl/convert-hsv-to-rgb;

void main() {
  float noiseR = texture(uNoiseTexture, vUv).r;
  vec3 color = convertHsvToRgb(
    vec3(
      (noiseR + uTime * 0.1),
      0.26,
      smoothstep(
        0.7,
        1.0,
        sin(radians(noiseR * 1800.0 + uTime * 60.0)) * 0.5 + 0.5
      ) * 0.12
    )
  );

  fragColor = vec4(color, 1.0);
}