import * as THREE from 'three'
import { easing } from 'ts-easing'
import { MathEx } from '~/assets/js/utils'

const DURATION = 0.4
const DELAY = 5

export default class BackCircleIn extends THREE.Mesh {
  time: number
  timeShow: number

  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.62,
    })

    super(geometry, material)
    this.time = 0
    this.timeShow = 0
    this.position.y = 2.2
    this.position.z = -1.45
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return
    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.time += time
    this.timeShow += time

    const stepShow = easing.outExpo(MathEx.clamp((this.timeShow - DELAY) / DURATION, 0, 1))

    this.rotation.z = this.time * 0.1 + stepShow * 2
    this.scale.set(stepShow, stepShow, stepShow)
  }
}
