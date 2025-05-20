import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
} from 'three';
import { getCoordAsPixel } from '~/utils';
import fragmentShader from './glsl/cursor.fs';
import vertexShader from './glsl/cursor.vs';

export class Cursor extends Mesh<PlaneGeometry, RawShaderMaterial> {
  element: Element;

  constructor(element: Element) {
    super(
      new PlaneGeometry(1, 1, 24, 24),
      new RawShaderMaterial({
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
      }),
    );

    this.element = element;
    this.scale.set(0, 0, 1);
  }
  update(resolution: Vector2, camera: PerspectiveCamera) {
    const coordAsPixel = getCoordAsPixel(camera, this.position);
    const rect = this.element.getBoundingClientRect();
    const width = (rect.width / resolution.x) * coordAsPixel.x;
    const height = (rect.height / resolution.y) * coordAsPixel.y;

    this.scale.set(width, height, 1);
    this.position.x =
      ((rect.x + rect.width * 0.5 - resolution.x * 0.5) / resolution.x) *
      coordAsPixel.x;
    this.position.y =
      ((rect.y + rect.height * 0.5 - resolution.y * 0.5) / resolution.y) *
      -coordAsPixel.y;
  }
}
