precision highp float;

out vec4 fragColor;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = (1.0 - smoothstep(0.4, 1.0, length(p)));

  fragColor = vec4(vec3(r), r * 0.5);
}