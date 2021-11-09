import * as THREE from 'three'

import vs from './glsl/PostEffect.vs'
import fs from './glsl/PostEffectBright.fs'

export default class PostEffectBright extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        minBright: {
          value: 0.1,
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

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.texture.value = texture
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x / 2, resolution.y / 2, 1)
  }
}