import * as THREE from 'three'
import vs from './glsl/Plane.vs'
import fs from './glsl/Plane.fs'

export default class Plane extends THREE.Mesh {
  current: number

  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          texture1: {
            value: null,
          },
          texture2: {
            value: null,
          },
          texture3: {
            value: null,
          },
          texture4: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
    })
    super(geometry, material)
    this.current = 0
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x, resolution.y, 1)
  }

  setTexture(t: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material
    
    if (this.current === 0) {
      uniforms.texture1.value = t
      this.current = 1
    } else if (this.current === 1) {
      uniforms.texture2.value = t
      this.current = 2
    } else if (this.current === 2) {
      uniforms.texture3.value = t
      this.current = 3
    } else if (this.current === 3) {
      uniforms.texture4.value = t
      this.current = 0
    }
  }
}
