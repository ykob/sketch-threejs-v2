import { PerspectiveCamera } from 'three';

export class Camera extends PerspectiveCamera {
  constructor() {
    super();
    this.position.z = 10;
    this.far = 100;
    this.setFocalLength(50);
  }
  resize(w: number, h: number) {
    this.aspect = w / h;
    this.updateProjectionMatrix();
  }
}
