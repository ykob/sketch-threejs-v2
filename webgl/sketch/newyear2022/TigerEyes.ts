import * as THREE from 'three'
import { easing } from 'ts-easing'
import { MathEx } from '~/assets/js/utils'

const DURATION = 2
const DELAY = 1.5

export default class TigerEyes extends THREE.Mesh {
  time: number
  timeShow: number

  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      color: 0x111109,
      metalness: 0.9,
      roughness: 0.3,
    })

    super(geometry, material)
    this.time = 0
    this.timeShow = 0
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) {
      return
    }

    this.time += time
    this.timeShow += time

    const sin = Math.sin(this.time * 3)
    const stepShow1 = easing.outCirc(
      MathEx.clamp((this.timeShow - DELAY) / DURATION, 0, 1)
    )
    const stepShow2 = easing.outExpo(
      MathEx.clamp((this.timeShow - DELAY) / DURATION, 0, 1)
    )

    this.position.y = (1 - stepShow1) * 2 + sin * 0.07 + 1.67
    this.rotation.y = MathEx.radians(stepShow1 * 720)
    this.scale.set(stepShow2, stepShow2, stepShow2)
  }
}
