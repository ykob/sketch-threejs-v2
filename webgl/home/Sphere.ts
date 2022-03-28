import * as THREE from 'three'

import vs from './glsl/Sphere.vs'
import fs from './glsl/Sphere.fs'

export default class Sphere extends THREE.Mesh {
  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.normalmap,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.fog,
        {
          time: {
            value: 0,
          },
          shininess: {
            value: 1000,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: false,
    })

    super(geometry, material)
    this.position.y = 500
    this.position.z = -800
    this.scale.set(90, 90, 90)
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
    this.rotation.y = uniforms.time.value * 0.1
    this.rotation.z = uniforms.time.value * 0.05
  }
}
