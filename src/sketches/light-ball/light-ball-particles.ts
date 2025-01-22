import {
  AdditiveBlending,
  BufferGeometry,
  GLSL3,
  IcosahedronGeometry,
  Points,
  RawShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import fragmentShader from './glsl/light-ball-particles.fs';
import vertexShader from './glsl/light-ball-particles.vs';

export class LightBallParticles extends Points<
  BufferGeometry,
  RawShaderMaterial
> {
  time: number;

  constructor(resolution: Vector2) {
    super(
      BufferGeometryUtils.mergeVertices(new IcosahedronGeometry(2, 5)),
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: resolution },
          uNoiseTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        blending: AdditiveBlending,
        depthWrite: false,
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
    const { position, normal } = this.geometry.attributes;

    this.time += delta;
    this.material.uniforms.uTime.value = this.time;
    for (let i = 0; i < position.count; i++) {
      const updatePosition = new Vector3(
        normal.getX(i),
        normal.getY(i),
        normal.getZ(i),
      );

      updatePosition.multiplyScalar(
        Math.sin(this.time * 0.6 + i * 0.4) * 0.6 + 2.2,
      );

      position.setXYZ(i, updatePosition.x, updatePosition.y, updatePosition.z);
    }
    position.needsUpdate = true;
    this.rotation.x = this.time * 0.1;
    this.rotation.y = this.time * 0.1;
  }
}
