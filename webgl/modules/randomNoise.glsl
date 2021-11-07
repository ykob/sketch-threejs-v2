#pragma glslify: random2 = require(./random2)

float randomNoise(vec2 p, float time) {
  return (random2(p - vec2(sin(time))) * 2.0 - 1.0);
}

#pragma glslify: export(randomNoise)
