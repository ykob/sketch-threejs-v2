import {
  GLSL3,
  IcosahedronGeometry,
  Mesh,
  RawShaderMaterial,
  Texture,
} from 'three';
import fragmentShader from './glsl/light-ball-core.fs';
import vertexShader from './glsl/light-ball-core.vs';

export class LightBallCore extends Mesh<
  IcosahedronGeometry,
  RawShaderMaterial
> {
  time: number;

  constructor() {
    super(
      new IcosahedronGeometry(1.4, 8),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
      }),
    );

    this.time = 0;
  }
  start(texture: Texture) {
    this.material.uniforms.uNoiseTexture.value = texture;
  }
  update(delta: number) {
    this.time += delta;
    this.material.uniforms.uTime.value = this.time;
    this.position.y = Math.sin(this.time) * 0.2;
  }
}
