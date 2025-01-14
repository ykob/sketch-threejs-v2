import { Group, Texture } from 'three';
import { LightBallCore } from './light-ball-core';

export class LightBall extends Group {
  core: LightBallCore;

  constructor() {
    super();

    this.core = new LightBallCore();
  }
  start(texture: Texture) {
    this.core.start(texture);
    this.add(this.core);
  }
  update(delta: number) {
    this.core.update(delta);
  }
}
