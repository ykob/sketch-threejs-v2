import {
  GLSL3,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  RepeatWrapping,
  Texture,
  Vector2,
} from 'three';
import { getCoordAsPixel } from '~/utils';
import fragmentShader from './glsl/image.fs';
import vertexShader from './glsl/image.vs';

export class Image extends Mesh<PlaneGeometry, RawShaderMaterial> {
  element: Element;
  isActivated: boolean;
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
        glslVersion: GLSL3,
      }),
    );

    this.element = element;
    this.isActivated = false;
    this.time = 0;
    this.scale.set(0, 0, 1);
  }
  start(noiseTexture: Texture) {
    const imageTexture = new Texture(this.element);

    imageTexture.wrapS = RepeatWrapping;
    imageTexture.wrapT = RepeatWrapping;
    imageTexture.needsUpdate = true;
    this.material.uniforms.uNoiseTexture.value = noiseTexture;
    this.material.uniforms.uImageTexture.value = imageTexture;
  }
  activate() {
    this.isActivated = true;
  }
  update(resolution: Vector2, camera: PerspectiveCamera, time: number) {
    if (!this.isActivated) return;

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
