import * as THREE from 'three'

export default class Mesh extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.TorusGeometry(30, 5, 16, 100)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00ff00),
    })
    super(geometry, material)
  }

  update(time: number) {
    this.rotation.x += time * 0.5
    this.rotation.y -= time
  }
}
