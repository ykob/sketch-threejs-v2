import { PerspectiveCamera, Vector2 } from 'three';

export class Camera extends PerspectiveCamera {
  constructor() {
    super();
    this.position.z = 10;
    this.far = 100;
    this.setFocalLength(50);
  }
  resize(resolution: Vector2) {
    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
  }
}
