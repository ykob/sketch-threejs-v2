import * as THREE from 'three'

export default class Background extends THREE.Mesh {
  time: number

  constructor() {
    const geometry = new THREE.SphereGeometry(100, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
    })

    super(geometry, material)
    this.time = 0
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshBasicMaterial)) return

    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshBasicMaterial)) return

    this.time += time
    this.rotation.y = this.time * -0.01
  }
}
