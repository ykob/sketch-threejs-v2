import { Group, Texture, Vector2 } from 'three';
import { LightBallCore } from './light-ball-core';
import { LightBallGlow } from './light-ball-glow';
import { LightBallParticles } from './light-ball-particles';

export class LightBall extends Group {
  core: LightBallCore;
  glow: LightBallGlow;
  particles: LightBallParticles;
  time: number;

  constructor(resolution: Vector2) {
    super();

    this.core = new LightBallCore();
    this.glow = new LightBallGlow();
    this.particles = new LightBallParticles(resolution);
    this.time = 0;
  }
  start(texture: Texture) {
    this.core.start(texture);
    this.glow.start(texture);
    this.add(this.core);
    this.add(this.glow);
    this.add(this.particles);
  }
  update(delta: number) {
    this.core.update(delta);
    this.glow.update(delta);
    this.particles.update(delta);
    this.time += delta;
  }
}
