import { IcosahedronGeometry, Points, PointsMaterial, Vector3 } from 'three';

export class LightBallParticles extends Points {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(2, 4),
      new PointsMaterial({
        color: 0xffffff,
        size: 0.08,
      }),
    );
    this.time = 0;
  }
  update(delta: number) {
    const { position, normal } = this.geometry.attributes;

    this.time += delta;
    for (let i = 0; i < position.count; i++) {
      const updatePosition = new Vector3(
        normal.getX(i),
        normal.getY(i),
        normal.getZ(i),
      );

      updatePosition.multiplyScalar(Math.sin(this.time + i * 0.1) * 1.8 + 1);

      position.setXYZ(i, updatePosition.x, updatePosition.y, updatePosition.z);
    }
    position.needsUpdate = true;
    this.rotation.x = this.time * 0.1;
    this.rotation.y = this.time * 0.1;
  }
}
