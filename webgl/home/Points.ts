import * as THREE from 'three'
import vs from './glsl/Points.vs'
import fs from './glsl/Points.fs'

export default class Points extends THREE.Points {
  constructor() {
    const geometry = new THREE.BufferGeometry()
    const num = 3000
    const baPositions = new THREE.BufferAttribute(new Float32Array(num * 3), 3)
    for (let i = 0, ul = num; i < ul; i++) {
      baPositions.setXYZ(
        i,
        (Math.random() * 2 - 1) * 120,
        Math.random() * Math.random() * 16 - 12,
        Math.random() * -500 + 100
      )
    }
    geometry.setAttribute('position', baPositions)

    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        {
          time: {
            value: 0,
          },
          tNoise: {
            value: null,
          },
          pixelRatio: {
            type: 'f',
            value: 2,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
    })
    super(geometry, material)
  }

  start(tNoise: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.tNoise.value = tNoise
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
  }
}
