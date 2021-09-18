import * as THREE from 'three'

export default class Plane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial()
    super(geometry, material)
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x, resolution.y, 1)
  }

  setTexture(t: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshBasicMaterial)) return
    this.material.map = t
  }
}
