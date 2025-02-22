precision highp float;

in float distanceToCamera;

out vec4 fragColor;

void main() {
  float opacity = 1.0 - smoothstep(10.0, 20.0, distanceToCamera);

  fragColor = vec4(vec3(1.0), opacity);
}
