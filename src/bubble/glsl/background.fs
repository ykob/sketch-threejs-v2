precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

void main() {
  float noiseR = texture2D(uNoiseTexture, vUv + uTime * vec2(0.0, -0.01)).r;
  float noiseB = texture2D(uNoiseTexture, vUv + uTime * vec2(0.01, 0.01)).g;
  float noiseG = texture2D(uNoiseTexture, vUv + uTime * vec2(-0.01, 0.01)).b;
  vec3 color = vec3(noiseR, noiseG, noiseB);

  gl_FragColor = vec4(color * vEdge * 0.6, 1.0);
}