import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Texture,
  Vector2,
} from 'three';
import { getCoordAsPixel } from '~/utils';
import fragmentShader from './glsl/image.fs';
import vertexShader from './glsl/image.vs';

export class Image extends Mesh<PlaneGeometry, RawShaderMaterial> {
  element: Element;
  time: number;

  constructor(element: Element) {
    super(
      new PlaneGeometry(1, 1, 24, 36),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
          uImageTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        glslVersion: GLSL3,
      }),
    );

    this.element = element;
    this.time = 0;
  }
  start(noiseTexture: Texture, imageTexture: Texture) {
    this.material.uniforms.uNoiseTexture.value = noiseTexture;
    this.material.uniforms.uImageTexture.value = imageTexture;
  }
  update(resolution: Vector2, camera: PerspectiveCamera, time: number) {
    const coordAsPixel = getCoordAsPixel(camera, this.position);
    const rect = this.element.getBoundingClientRect();
    const width = (rect.width / resolution.x) * coordAsPixel.x;
    const height = (rect.height / resolution.y) * coordAsPixel.y;

    this.time += time;
    this.scale.set(width, height, 1);
    this.position.x =
      ((rect.x + rect.width * 0.5 - resolution.x * 0.5) / resolution.x) *
      coordAsPixel.x;
    this.position.y =
      ((rect.y + rect.height * 0.5 - resolution.y * 0.5) / resolution.y) *
      -coordAsPixel.y;
    this.material.uniforms.uTime.value = this.time;
  }
}
