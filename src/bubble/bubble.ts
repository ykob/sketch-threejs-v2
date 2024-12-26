import { Mesh, OctahedronGeometry, RawShaderMaterial } from 'three';
import fragmentShader from './glsl/bubble.fs?raw';
import vertexShader from './glsl/bubble.vs?raw';

export class Bubble extends Mesh {
  constructor() {
    super(
      new OctahedronGeometry(1, 8),
      new RawShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader,
        fragmentShader,
      }),
    );
  }
}
