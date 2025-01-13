import {
  GLSL3,
  IcosahedronGeometry,
  Mesh,
  RawShaderMaterial,
  RepeatWrapping,
  Texture,
} from 'three';
import fragmentShader from './glsl/background.fs';
import vertexShader from './glsl/background.vs';

export class Background extends Mesh<IcosahedronGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(50, 8),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        side: 2,
        glslVersion: GLSL3,
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
