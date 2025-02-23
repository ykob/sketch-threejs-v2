precision highp float;

uniform sampler2D uImageTexture;

in float vDistanceToCamera;
in vec2 vUv;

out vec4 fragColor;

void main() {
  vec4 color = texture(uImageTexture, vUv);
  float opacity = 1.0 - smoothstep(10.0, 20.0, vDistanceToCamera);

  fragColor = vec4(vec3(1.0), opacity * color.r);
}
