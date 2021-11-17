import * as THREE from 'three'

import vs from './glsl/Background.vs'
import fs from './glsl/Background.fs'

export default class Background extends THREE.Mesh {
  time: number

  constructor() {
    const geometry = new THREE.SphereGeometry(1400, 32, 32)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        texture: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
    })

    super(geometry, material)
    this.time = 0
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.texture.value = texture
  }

  update(time: number) {
    this.time += time
    this.rotation.x = this.time * 0.02
    this.rotation.y = this.time * 0.04
    this.rotation.z = this.time * 0.01
  }
}
