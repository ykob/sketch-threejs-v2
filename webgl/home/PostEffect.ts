import * as THREE from 'three'
import vs from '../common/glsl/PostEffect.vs'
import fs from './glsl/PostEffect.fs'

export default class PostEffect extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          time: {
            value: 0,
          },
          tNoise: {
            value: null,
          },
          tTarget1: {
            value: null,
          },
          tTarget2: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
    })
    super(geometry, material)
  }

  start(
    { tNoise, tTarget1, tTarget2 }
    : {
      tNoise: THREE.Texture
      tTarget1: THREE.Texture
      tTarget2: THREE.Texture
    }
  ) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.tNoise.value = tNoise
    uniforms.tTarget1.value = tTarget1
    uniforms.tTarget2.value = tTarget2
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x / 2, resolution.y / 2, 1)
  }
}
