import * as THREE from 'three'
import { easing } from 'ts-easing'
import { MathEx } from '~/assets/js/utils'

const DURATION1 = 1
const DELAY = 1

export default class TigerBody extends THREE.Mesh {
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
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.time += time
    this.timeShow += time

    const stepShow1 = easing.outCubic(MathEx.clamp((this.timeShow - DELAY) / DURATION1, 0, 1))
    const stepShow2 = easing.outExpo(MathEx.clamp((this.timeShow - DELAY) / DURATION1, 0, 1))

    this.position.y = (1 - stepShow1) * 0.4
    this.scale.set(stepShow2, stepShow2, stepShow2)
  }
}
