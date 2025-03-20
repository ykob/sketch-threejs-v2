import { Vector3 } from 'three';

export class Hook3 {
  force = new Vector3();
  acceleration = new Vector3();
  velocity = new Vector3();
  anchor = new Vector3();
  k: number;
  damp: number;
  mass: number;
  length: number;
  drag: number;

  constructor({
    k = 0.2,
    damp = 0.98,
    mass = 1,
    length = 0,
    drag = 0.01,
  }: {
    k?: number;
    damp?: number;
    mass?: number;
    length?: number;
    drag?: number;
  }) {
    this.k = k;
    this.damp = damp;
    this.mass = mass;
    this.length = length;
    this.drag = drag;
  }

  setAnchor(x: number, y: number, z: number) {
    this.anchor.set(x, y, z);
  }

  update() {
    // Drag
    this.force
      .copy(this.acceleration)
      .multiplyScalar(-1)
      .normalize()
      .multiplyScalar(this.acceleration.length() * this.drag);
    this.acceleration.add(this.force);

    // Hook's law
    this.force.copy(this.velocity).sub(this.anchor);

    const distance = this.force.length();

    this.force.normalize().multiplyScalar(distance * this.k * -1);
    this.acceleration.add(this.force);

    // Update velocity
    this.acceleration.divideScalar(this.mass);
    this.velocity.add(this.acceleration);
  }
}
