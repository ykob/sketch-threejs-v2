import * as THREE from 'three'
import { MathEx } from '~/assets/js/utils'
import vs from './glsl/Points.vs'
import fs from './glsl/Points.fs'

export default class Points extends THREE.Points {
  constructor() {
    const geometry = new THREE.BufferGeometry()
    const num = 5000
    const baPositions = new THREE.BufferAttribute(new Float32Array(num * 3), 3)
    const baSizes = new THREE.BufferAttribute(new Float32Array(num), 1)
    const baDelays = new THREE.BufferAttribute(new Float32Array(num), 1)

    for (let i = 0, ul = num; i < ul; i++) {
      const radian = MathEx.radians(Math.random() * 360)
      const radius =
        ((Math.random() + Math.random() + Math.random()) / 3) * 8 + 0.7
      const x = Math.cos(radian) * radius
      const y = Math.sin(radian) * radius
      const z = Math.random() * -30 + 10
      const size = Math.random() * 0.5 + 0.5
      const delay = Math.random() * 5 + 6

      baPositions.setXYZ(i, x, y, z)
      baSizes.setX(i, size)
      baDelays.setX(i, delay)
    }
    geometry.setAttribute('position', baPositions)
    geometry.setAttribute('size', baSizes)
    geometry.setAttribute('delay', baDelays)

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
          resolution: {
            value: new THREE.Vector2(),
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
    this.position.y = 2.2
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
    this.rotation.z = uniforms.time.value * 0.05
  }

  resize(resolution: THREE.Vector2) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) {
      return
    }
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
  }
}
