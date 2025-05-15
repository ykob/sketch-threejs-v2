import {
  DoubleSide,
  Euler,
  GLSL3,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  InstancedMesh,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  RawShaderMaterial,
  Texture,
  Vector3,
} from 'three';
import { radians, spherical } from '~/utils';
import fragmentShader from './glsl/confetti.fs';
import vertexShader from './glsl/confetti.vs';

const count = 300;

export class Confetti extends InstancedMesh<
  InstancedBufferGeometry,
  RawShaderMaterial
> {
  params: {
    euler: Euler;
    eulerSpeed: Euler;
    scale: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
  }[] = [];
  matrix: Matrix4 = new Matrix4();
  quaternion: Quaternion = new Quaternion();
  isAnimated: boolean = false;

  constructor() {
    const baseGeometry = new PlaneGeometry(0.5, 0.5);
    const geometry = new InstancedBufferGeometry();
    const texutreIndex = new InstancedBufferAttribute(
      new Float32Array(count * 2),
      2,
    );

    geometry.setAttribute('position', baseGeometry.attributes.position);
    geometry.setAttribute('normal', baseGeometry.attributes.normal);
    geometry.setAttribute('uv', baseGeometry.attributes.uv);
    geometry.setAttribute('textureIndex', texutreIndex);
    geometry.setIndex(baseGeometry.index);

    super(
      geometry,
      new RawShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uImageTexture: { value: null },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        glslVersion: GLSL3,
        depthWrite: false,
        side: DoubleSide,
      }),
      count,
    );
  }
  start(imageTexture: Texture) {
    this.material.uniforms.uImageTexture.value = imageTexture;

    this.params = Array.from({ length: count }, () => {
      const scale = Math.random() * 0.75 + 0.25;

      return {
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
        velocity: new Vector3(),
        acceleration: new Vector3(),
      };
    });

    for (let i = 0; i < this.params.length; i++) {
      const textureIndex = [
        Math.round(Math.random()),
        Math.round(Math.random()),
      ];

      this.geometry.attributes.textureIndex.setXY(
        i,
        textureIndex[0],
        textureIndex[1],
      );
      this.geometry.attributes.textureIndex.needsUpdate = true;
    }
  }
  splash() {
    this.isAnimated = true;
    this.params.forEach((param) => {
      const radian1 = radians(Math.random() * 360);
      const radian2 = radians(Math.random() * 360);
      const radius = Math.random() * 0.32 + 0.12;
      const acceleration = spherical(radian1, radian2, radius);

      param.velocity.set(0, 0, 0);
      param.acceleration.set(acceleration.x, acceleration.y, acceleration.z);
    });
  }
  update(delta: number) {
    if (!this.isAnimated) return;
    for (let i = 0; i < this.params.length; i++) {
      const { velocity, acceleration, euler, eulerSpeed, scale } =
        this.params[i];
      const drug = 0.96;

      acceleration.multiplyScalar(drug);
      acceleration.add(new Vector3(0, -0.001, 0));
      velocity.add(acceleration);
      euler.x += delta * eulerSpeed.x;
      euler.y += delta * eulerSpeed.y;
      euler.z += delta * eulerSpeed.z;
      this.quaternion.setFromEuler(euler);
      this.matrix.compose(velocity, this.quaternion, scale);
      this.setMatrixAt(i, this.matrix);
    }
    this.material.uniforms.uTime.value += delta;
    this.instanceMatrix.needsUpdate = true;
  }
}
