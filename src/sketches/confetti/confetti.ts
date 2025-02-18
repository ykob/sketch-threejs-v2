import {
  GLSL3,
  InstancedBufferGeometry,
  InstancedMesh,
  Matrix4,
  PlaneGeometry,
  RawShaderMaterial,
  Vector3,
} from 'three';
import fragmentShader from './glsl/confetti.fs';
import vertexShader from './glsl/confetti.vs';

export class Confetti extends InstancedMesh<
  InstancedBufferGeometry,
  RawShaderMaterial
> {
  constructor() {
    const baseGeometry = new PlaneGeometry(0.1, 0.1);
    const geometry = new InstancedBufferGeometry();

    geometry.setAttribute('position', baseGeometry.attributes.position);
    geometry.setAttribute('normal', baseGeometry.attributes.normal);
    geometry.setAttribute('uv', baseGeometry.attributes.uv);
    geometry.setIndex(baseGeometry.index);

    super(
      geometry,
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
      1000,
    );
  }
  start() {
    for (let i = 0; i < this.count; i++) {
      const matrix = new Matrix4();
      const position = new Vector3();
      const x = (Math.random() * 2 - 1) * 5;
      const y = (Math.random() * 2 - 1) * 5;
      const z = (Math.random() * 2 - 1) * 5;

      position.set(x, y, z);
      matrix.setPosition(position);
      this.setMatrixAt(i, matrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
  update() {}
}
