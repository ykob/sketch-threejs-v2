import * as THREE from 'three'

export default class Mesh extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.ConeGeometry(10, 60, 32)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffff00),
    })
    super(geometry, material)
  }

  update(time: number) {
    this.rotation.y += time
    this.rotation.z -= time
  }
}
