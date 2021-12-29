import * as THREE from 'three'

export default class TigerEyes extends THREE.Mesh {
  time: number

  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      color: 0x111109,
      metalness: 0.9,
      roughness: 0.3,
    })

    super(geometry, material)
    this.time = 0
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.time += time

    const sin1 = Math.sin(this.time * 3)
    const sin2 = Math.sin(this.time * 0.8)

    this.position.y = sin1 * 0.07 + 1.67
    this.rotation.y = sin2 * 0.5
  }
}
