import { Group, Texture } from 'three';
import { LightBallCore } from './light-ball-core';
import { LightBallGlow } from './light-ball-glow';
import { LightBallParticle } from './light-ball-particle';

export class LightBall extends Group {
  core: LightBallCore;
  glow: LightBallGlow;
  particle: LightBallParticle;
  time: number;

  constructor() {
    super();

    this.core = new LightBallCore();
    this.glow = new LightBallGlow();
    this.particle = new LightBallParticle();
    this.time = 0;
  }
  start(texture: Texture) {
    this.core.start(texture);
    this.glow.start(texture);
    this.add(this.core);
    this.add(this.glow);
    this.add(this.particle);
  }
  update(delta: number) {
    this.core.update(delta);
    this.glow.update(delta);
    this.particle.update(delta);
    this.time += delta;
  }
}
