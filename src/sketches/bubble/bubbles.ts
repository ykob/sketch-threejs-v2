import { Group, Texture, Vector3 } from 'three';
import { Bubble } from './bubble';

export class Bubbles extends Group {
  bubbles: Bubble[];

  constructor() {
    super();

    this.bubbles = [new Bubble(0 / 3), new Bubble(1 / 3), new Bubble(2 / 3)];
  }
  start(texture: Texture) {
    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];

      bubble.start(texture);
      bubble.position.set(
        Math.cos((Math.PI / 180) * 120 * i) * 1.5,
        Math.sin((Math.PI / 180) * 120 * i) * 1.5,
        Math.sin((Math.PI / 180) * 90 * i) * 1.5,
      );
      this.add(bubble);
    }
  }
  update(delta: number, cameraPosition: Vector3) {
    for (let i = 0; i < this.bubbles.length; i++) {
      const bubble = this.bubbles[i];

      bubble.update(delta);
      bubble.lookAt(cameraPosition);
    }
    this.rotation.y += delta * 0.1;
  }
}
