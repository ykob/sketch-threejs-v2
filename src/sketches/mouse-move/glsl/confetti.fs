precision highp float;

uniform sampler2D uImageTexture;

in float vDistanceToCamera;
in vec2 vUv;
in float vOpacity;

out vec4 fragColor;

void main() {
  vec4 color = texture(uImageTexture, vUv);

  fragColor = vec4(vec3(1.0), color.r * vOpacity);
}
