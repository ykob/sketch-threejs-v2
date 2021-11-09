import * as THREE from 'three'

import vs from './glsl/PostEffect.vs'
import fs from './glsl/PostEffectBlur.fs'

export default class PostEffectBlur extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: {
          value: new THREE.Vector2(),
        },
        direction: {
          value: new THREE.Vector2(),
        },
        texture: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    })

    super(geometry, material)
  }

  start({ texture, x, y }: {
    texture: THREE.Texture
    x: number
    y: number
  }) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.texture.value = texture
    uniforms.direction.value.set(x, y)
  }

  resize(resolution: THREE.Vector2) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
    this.scale.set(resolution.x / 2, resolution.y / 2, 1)
  }
}