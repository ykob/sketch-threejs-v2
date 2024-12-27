import {
  Mesh,
  OctahedronGeometry,
  RawShaderMaterial,
  RepeatWrapping,
  Texture,
} from 'three';
import fragmentShader from './glsl/bubble.fs?raw';
import vertexShader from './glsl/bubble.vs?raw';

export class Bubble extends Mesh<OctahedronGeometry, RawShaderMaterial> {
  constructor() {
    super(
      new OctahedronGeometry(1, 8),
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
  }
  start(texture: Texture) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    this.material.uniforms.uNoiseTexture.value = texture;
  }
  update(time: number) {
    this.material.uniforms.uTime.value = time;
  }
}
