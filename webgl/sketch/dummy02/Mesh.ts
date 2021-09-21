import * as THREE from 'three'

export default class Mesh extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.TorusKnotGeometry(20, 4, 100, 32)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x0000ff),
    })
    super(geometry, material)
  }

  update(time: number) {
    this.rotation.x += time
    this.rotation.y += time
  }
}
