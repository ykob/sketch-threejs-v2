precision highp float;

varying float vEdge;

void main() {
  gl_FragColor = vec4(vec3(vEdge), 1.0);
}