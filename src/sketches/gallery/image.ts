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
  constructor(_texture?: Texture) {
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
  }
  resize(camera: PerspectiveCamera) {
    const winH = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(radians(camera.fov) / 2) *
        2,
    );
    const winW = winH * camera.aspect * Math.min(1200 / window.innerWidth, 1);
    const width = winW * 0.333;
    const height = (width * 3) / 2;

    this.scale.set(width, height, 1);
    this.position.set(winW * -0.5 + width * 0.5, winH * 0.5 - height * 0.5, 0);
  }
}
