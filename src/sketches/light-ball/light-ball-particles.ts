import {
  GLSL3,
  IcosahedronGeometry,
  Points,
  RawShaderMaterial,
  Vector3,
} from 'three';
import fragmentShader from './glsl/light-ball-particles.fs';
import vertexShader from './glsl/light-ball-particles.vs';

export class LightBallParticles extends Points {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(2, 4),
      new RawShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        glslVersion: GLSL3,
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
