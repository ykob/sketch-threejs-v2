precision highp float;

uniform float time;
uniform sampler2D tNoise;
uniform sampler2D tTarget1;
uniform sampler2D tTarget2;

varying vec2 vUv;

void main() {
  vec3 target1 = texture2D(tTarget1, vUv).rgb;
  vec3 target2 = texture2D(tTarget2, vUv).rgb;

  gl_FragColor = vec4(target1, 1.0);
}
