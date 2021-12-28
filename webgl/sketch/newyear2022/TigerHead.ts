import * as THREE from 'three'

export default class TigerHead extends THREE.Mesh {
  time: number

  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.62,
    })

    super(geometry, material)
    this.time = 0
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return
    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return

    this.time += time

    this.rotation.y = this.time
  }
}
