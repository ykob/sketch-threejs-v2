import * as THREE from 'three'

import vs from './glsl/Background.vs'
import fs from './glsl/Background.fs'

export default class Background extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry(2000, 32, 32)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        texture: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
    })

    super(geometry, material)
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.texture.value = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.time.value += time
    this.rotation.x = Math.sin(uniforms.time.value * 0.4) * 0.04
    this.rotation.y = Math.cos(uniforms.time.value * 0.2) * 0.16 + 1.4
  }
}
