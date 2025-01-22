import {
  AdditiveBlending,
  GLSL3,
  IcosahedronGeometry,
  Points,
  RawShaderMaterial,
  Vector2,
  Vector3,
} from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import fragmentShader from './glsl/light-ball-particles.fs';
import vertexShader from './glsl/light-ball-particles.vs';

export class LightBallParticles extends Points {
  time: number;

  constructor(resolution: Vector2) {
    super(
      BufferGeometryUtils.mergeVertices(new IcosahedronGeometry(2, 3)),
      new RawShaderMaterial({
        uniforms: {
          uResolution: { value: resolution },
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
  update(delta: number) {
    const { position, normal } = this.geometry.attributes;

    this.time += delta;
    for (let i = 0; i < position.count; i++) {
      const updatePosition = new Vector3(
        normal.getX(i),
        normal.getY(i),
        normal.getZ(i),
      );

      updatePosition.multiplyScalar(
        Math.sin(this.time * 0.6 + i * 40.1) * 0.8 + 2.4,
      );

      position.setXYZ(i, updatePosition.x, updatePosition.y, updatePosition.z);
    }
    position.needsUpdate = true;
    this.rotation.x = this.time * 0.1;
    this.rotation.y = this.time * 0.1;
  }
}
