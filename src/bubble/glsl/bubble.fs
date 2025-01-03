precision highp float;

uniform float uTime;
uniform float uDiff;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vEdge;

void main() {
  float noiseR = texture2D(uNoiseTexture, vUv + uDiff + uTime * vec2(0.0, -0.04)).r;
  float noiseB = texture2D(uNoiseTexture, vUv + uDiff + uTime * vec2(0.04, 0.04)).g;
  float noiseG = texture2D(uNoiseTexture, vUv + uDiff + uTime * vec2(-0.04, 0.04)).b;
  vec3 color = vec3(noiseR, noiseG, noiseB);

  gl_FragColor = vec4(color, vEdge);
}