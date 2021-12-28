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

    this.rotation.y = this.time
  }
}
