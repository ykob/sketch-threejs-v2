import { Group, Texture } from 'three';
import { LightBallCore } from './light-ball-core';
import { LightBallGlow } from './light-ball-glow';

export class LightBall extends Group {
  core: LightBallCore;
  glow: LightBallGlow;
  time: number;

  constructor() {
    super();

    this.core = new LightBallCore();
    this.glow = new LightBallGlow();
    this.time = 0;
  }
  start(texture: Texture) {
    this.core.start(texture);
    this.glow.start(texture);
    this.add(this.core);
    this.add(this.glow);
  }
  update(delta: number) {
    this.core.update(delta);
    this.glow.update(delta);
    this.time += delta;
    this.position.y = Math.sin(this.time) * 0.2;
  }
}
