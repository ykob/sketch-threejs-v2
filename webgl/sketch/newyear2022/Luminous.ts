import * as THREE from 'three'

import vs from './glsl/Luminous.vs'
import fs from './glsl/Luminous.fs'
import { MathEx } from '~/assets/js/utils'

export default class Luminous extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.CylinderGeometry(2.5, 10, 2, 72, 1, true)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        tNoise: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    super(geometry, material)
    this.position.y = 2.2
    this.position.z = -2.2
    this.rotation.x = MathEx.radians(-90)
  }

  start(tNoise: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.tNoise.value = tNoise
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.time.value += time
  }
}
