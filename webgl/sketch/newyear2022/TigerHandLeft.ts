import * as THREE from 'three'
import { MathEx } from '~/assets/js/utils'

export default class TigerHandLeft extends THREE.Mesh {
  time: number

  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.62,
    })

    super(geometry, material)
    this.time = 0
    this.position.set(0.85, 1.3, 0.44)
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return
    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.time += time

    const sin = Math.sin(this.time) * 0.5 + 0.5

    this.position.x = sin * 0.2 + 0.85
    this.rotation.x = MathEx.radians(sin * -33.3)
    this.rotation.y = MathEx.radians(sin * 45)
    this.rotation.z = MathEx.radians(sin * -33.3)
  }
}
