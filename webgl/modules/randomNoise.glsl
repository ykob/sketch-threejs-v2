#pragma glslify: random = require(@ykob/glsl-util/src/random)

float randomNoise(vec2 p, float time) {
  return (random(p - vec2(sin(time))) * 2.0 - 1.0);
}

#pragma glslify: export(randomNoise)
