import * as THREE from 'three'

import vs from './glsl/Sphere.vs'
import fs from './glsl/Sphere.fs'

export default class Sphere extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry(240, 32, 32)
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
    })

    super(geometry, material)
    this.position.y = 440
    this.position.z = -800
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.texture.value = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
    this.rotation.y = uniforms.time.value * 0.01
  }
}
