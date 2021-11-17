precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

void main() {
  vec2 uv = vUv + vec2(
    sin(vUv.x * 30.0 + time * 0.5) * 0.5 + sin(vUv.x * 60.0 + time) * 0.1,
    cos(vUv.y * 15.0 + time * 0.5) * 0.5 + cos(vUv.y * 30.0 + time) * 0.1
  ) * 0.02;
  vec4 texColor = texture2D(texture, uv);

  gl_FragColor = texColor - texColor * sin(radians(time * 360.0 * 0.5)) * 0.1;
}
