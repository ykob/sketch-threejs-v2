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

const count = 100;

export class Confetti extends InstancedMesh<
  InstancedBufferGeometry,
  RawShaderMaterial
> {
  params: {
    direction: Vector3;
    position: Vector3;
    euler: Euler;
    eulerSpeed: Euler;
    scale: Vector3;
    time: number;
  }[] = [];
  matrix: Matrix4 = new Matrix4();
  quaternion: Quaternion = new Quaternion();
  targetPosition: Vector3 = new Vector3();

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
      const direction = spherical(
        radians(Math.random() * 360),
        radians(Math.random() * 360),
        1,
      );

      return {
        direction: new Vector3(direction.x, direction.y, direction.z),
        position: new Vector3(),
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
        time: 0,
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
  update(delta: number) {
    for (let i = 0; i < this.params.length; i++) {
      const { position, direction, euler, eulerSpeed, scale } = this.params[i];

      this.params[i].time += delta;

      const updatePosition = direction
        .clone()
        .multiplyScalar(this.params[i].time);

      position.copy(updatePosition);
      euler.x += delta * eulerSpeed.x;
      euler.y += delta * eulerSpeed.y;
      euler.z += delta * eulerSpeed.z;
      this.quaternion.setFromEuler(euler);
      this.matrix.compose(position, this.quaternion, scale);
      this.setMatrixAt(i, this.matrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
  setTarget(x: number, y: number) {
    this.targetPosition.set(x, y, 0);
  }
}
