precision highp float;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

void main() {
  vec3 color = vec3(1.0, 0.0, 0.0);

  fragColor = vec4(color, 1.0);
}