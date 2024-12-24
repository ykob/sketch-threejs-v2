import { Mesh, MeshPhongMaterial, OctahedronGeometry } from 'three';

export class Bubble extends Mesh {
  constructor() {
    super(
      new OctahedronGeometry(1),
      new MeshPhongMaterial({ color: 0x00ff00 }),
    );
  }
}
