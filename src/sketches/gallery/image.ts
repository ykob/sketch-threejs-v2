import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Texture,
} from 'three';
import { radians } from '~/utils';
import fragmentShader from './glsl/image.fs';
import vertexShader from './glsl/image.vs';

export class Image extends Mesh<PlaneGeometry, RawShaderMaterial> {
  element: Element;

  constructor(element: Element, _texture?: Texture) {
    super(
      new PlaneGeometry(1, 1, 24, 36),
      new RawShaderMaterial({
        // uniforms: {
        //   uTexture: { value: texture },
        // },
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
      }),
    );

    this.element = element;
  }
  update(camera: PerspectiveCamera) {
    const windowIW = window.innerWidth;
    const windowIH = window.innerHeight;
    const winH = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(radians(camera.fov) / 2) *
        2,
    );
    const winW = winH * camera.aspect;
    const rect = this.element.getBoundingClientRect();
    const width = (rect.width / windowIW) * winW;
    const height = (rect.height / windowIH) * winH;

    this.scale.set(width, height, 1);
    this.position.x =
      ((rect.x + rect.width * 0.5 - windowIW * 0.5) / windowIW) * winW;
    this.position.y =
      ((rect.y + rect.height * 0.5 - windowIH * 0.5) / windowIH) * -winH;
  }
}
