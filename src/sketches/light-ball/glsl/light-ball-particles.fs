precision highp float;

uniform float uTime;
uniform sampler2D uNoiseTexture;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec4 noise = texture(uNoiseTexture, vUv + uTime * vec2(0.0, -0.2));

  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = (1.0 - smoothstep(0.01, 1.0, length(p)));

  fragColor = vec4(vec3(1.0), (r - noise.r * 1.6) * 0.24);
}