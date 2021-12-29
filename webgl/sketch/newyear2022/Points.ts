import * as THREE from 'three'
import vs from './glsl/Points.vs'
import fs from './glsl/Points.fs'
import { MathEx } from '~/assets/js/utils'

export default class Points extends THREE.Points {
  constructor() {
    const geometry = new THREE.BufferGeometry()
    const num = 6000
    const baPositions = new THREE.BufferAttribute(new Float32Array(num * 3), 3)
    const baSizes = new THREE.BufferAttribute(new Float32Array(num), 1)

    for (let i = 0, ul = num; i < ul; i++) {
      const radian = MathEx.radians(Math.random() * 360)
      const radius = ((Math.random() + Math.random() + Math.random()) / 3 * 8 + 3)
      const x = Math.cos(radian) * radius
      const y = Math.sin(radian) * radius
      const z = Math.random() * -30 + 10
      const size = Math.random() * 0.5 + 0.5

      baPositions.setXYZ(i, x, y, z)
      baSizes.setX(i, size)
    }
    geometry.setAttribute('position', baPositions)
    geometry.setAttribute('size', baSizes)

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
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.tNoise.value = tNoise
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
    this.rotation.z = uniforms.time.value * 0.05
  }

  resize(resolution: THREE.Vector2) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
  }
}
