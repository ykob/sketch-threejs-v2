import { GLSL3, Mesh, PlaneGeometry, RawShaderMaterial, Texture } from 'three';
import fragmentShader from './glsl/light-ball-glow.fs';
import vertexShader from './glsl/light-ball-glow.vs';

export class LightBallGlow extends Mesh<PlaneGeometry, RawShaderMaterial> {
  time: number;

  constructor() {
    super(
      new PlaneGeometry(5.6, 5.6),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
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
  }
}
