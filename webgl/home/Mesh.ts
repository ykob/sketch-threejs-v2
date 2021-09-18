import * as THREE from 'three'

export default class Mesh extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.DodecahedronGeometry(20, 1)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff0000),
    })
    super(geometry, material)
  }

  update(time: number) {
    this.rotation.y += time
  }
}
