import * as THREE from 'three'

import vs from './glsl/PostEffect.vs'
import fs from './glsl/PostEffectBloom.fs'

export default class PostEffectBloom extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        texture1: {
          value: null,
        },
        texture2: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    })

    super(geometry, material)
  }

  start({
    texture1,
    texture2,
  }: {
    texture1: THREE.Texture
    texture2: THREE.Texture
  }) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.texture1.value = texture1
    uniforms.texture2.value = texture2
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x / 2, resolution.y / 2, 1)
  }
}
