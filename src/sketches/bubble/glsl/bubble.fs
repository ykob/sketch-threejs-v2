precision highp float;

uniform float uTime;
uniform float uDiff;
uniform sampler2D uNoiseTexture;

in vec2 vUv;
in float vEdge;

out vec4 fragColor;

void main() {
  float noiseR = texture(
    uNoiseTexture,
    vUv + uDiff + uTime * vec2(0.0, -0.04)
  ).r;
  float noiseB = texture(
    uNoiseTexture,
    vUv + uDiff + uTime * vec2(0.04, 0.04)
  ).g;
  float noiseG = texture(
    uNoiseTexture,
    vUv + uDiff + uTime * vec2(-0.04, 0.04)
  ).b;
  vec3 color = vec3(noiseR, noiseG, noiseB);

  fragColor = vec4(color, vEdge);
}
