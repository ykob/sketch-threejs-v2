import {
  IcosahedronGeometry,
  Mesh,
  RawShaderMaterial,
  RepeatWrapping,
  Texture,
} from 'three';
import fragmentShader from './glsl/background.fs?raw';
import vertexShader from './glsl/background.vs?raw';

export class Background extends Mesh<IcosahedronGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(10, 8),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        side: 2,
      }),
    );

    this.time = 0;
  }
  start(texture: Texture) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    this.material.uniforms.uNoiseTexture.value = texture;
  }
  update(time: number) {
    this.time += time;
    this.material.uniforms.uTime.value = this.time;
  }
}