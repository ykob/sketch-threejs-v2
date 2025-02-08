precision highp float;

uniform sampler2D uNoiseTexture;
uniform sampler2D uImageTexture;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec3 color = texture(uImageTexture, vUv).rgb;

  fragColor = vec4(color, 1.0);
}