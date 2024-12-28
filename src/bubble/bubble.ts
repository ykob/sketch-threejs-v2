import {
  IcosahedronGeometry,
  Mesh,
  RawShaderMaterial,
  RepeatWrapping,
  Texture,
} from 'three';
import fragmentShader from './glsl/bubble.fs?raw';
import vertexShader from './glsl/bubble.vs?raw';

export class Bubble extends Mesh<IcosahedronGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(1, 5),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
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
    this.scale.setScalar(1 + Math.sin(this.time) * 0.05);
    this.material.uniforms.uTime.value = this.time;
  }
}
