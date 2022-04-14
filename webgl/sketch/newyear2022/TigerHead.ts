import * as THREE from 'three'
import { easing } from 'ts-easing'
import { MathEx } from '@ykob/js-util'

const DURATION1 = 2
const DELAY = 1.5

export default class TigerHead extends THREE.Mesh {
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
    if (!(this.material instanceof THREE.MeshStandardMaterial)) {
      return
    }
    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) {
      return
    }

    this.time += time
    this.timeShow += time

    const sin = Math.sin(this.time * 3)
    const stepShow1 = easing.outCirc(
      MathEx.clamp((this.timeShow - DELAY) / DURATION1, 0, 1)
    )
    const stepShow2 = easing.outExpo(
      MathEx.clamp((this.timeShow - DELAY) / DURATION1, 0, 1)
    )

    this.position.y = (1 - stepShow1) * 2 + sin * 0.07 + 1.67
    this.rotation.y = MathEx.radians(stepShow1 * 720)
    this.scale.set(stepShow2, stepShow2, stepShow2)
  }
}
