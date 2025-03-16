import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
} from 'three';
import { getCoordAsPixel } from '~/utils';

export class CollisionTarget extends Mesh<PlaneGeometry, MeshBasicMaterial> {
  constructor() {
    super(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
      }),
    );
  }
  resize(camera: PerspectiveCamera) {
    const coordAsPixel = getCoordAsPixel(camera, this.position);

    this.scale.set(coordAsPixel.x, coordAsPixel.y, 1);
  }
}
