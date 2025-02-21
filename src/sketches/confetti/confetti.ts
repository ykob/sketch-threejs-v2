import {
  DoubleSide,
  Euler,
  GLSL3,
  InstancedBufferGeometry,
  InstancedMesh,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  RawShaderMaterial,
  Vector3,
} from 'three';
import fragmentShader from './glsl/confetti.fs';
import vertexShader from './glsl/confetti.vs';

const count = 1000;

export class Confetti extends InstancedMesh<
  InstancedBufferGeometry,
  RawShaderMaterial
> {
  params: {
    position: Vector3;
    speed: number;
    euler: Euler;
    eulerSpeed: Euler;
    scale: Vector3;
  }[] = [];
  matrix: Matrix4 = new Matrix4();
  quaternion: Quaternion = new Quaternion();

  constructor() {
    const baseGeometry = new PlaneGeometry(0.25, 0.25);
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
        side: DoubleSide,
      }),
      count,
    );
  }
  start() {
    const scale = Math.random() * 0.5 + 0.5;
    this.params = Array.from({ length: count }, () => ({
      position: new Vector3(
        (Math.random() * 2 - 1) * 5,
        (Math.random() * 2 - 1) * 5,
        (Math.random() * 2 - 1) * 20,
      ),
      speed: Math.random() * 2 + 1,
      euler: new Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ),
      eulerSpeed: new Euler(
        (Math.random() * 0.4 + 0.1) * Math.PI,
        (Math.random() * 0.4 + 0.1) * Math.PI,
        (Math.random() * 0.4 + 0.1) * Math.PI,
      ),
      scale: new Vector3(scale, scale, scale),
    }));
  }
  update(delta: number) {
    for (let i = 0; i < this.params.length; i++) {
      const { position, speed, euler, eulerSpeed, scale } = this.params[i];
      position.z = ((position.z + delta * speed + 20) % 40) - 20;
      euler.x += delta * eulerSpeed.x;
      euler.y += delta * eulerSpeed.y;
      euler.z += delta * eulerSpeed.z;
      this.quaternion.setFromEuler(euler);
      this.matrix.compose(position, this.quaternion, scale);
      this.setMatrixAt(i, this.matrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}
