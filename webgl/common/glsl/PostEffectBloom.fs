precision highp float;

uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 vUv;

void main() {
  vec3 color1 = texture2D(texture1, vUv).rgb;
  vec3 color2 = texture2D(texture2, vUv).rgb;

  gl_FragColor = vec4(color1 + color2, 1.0);
}