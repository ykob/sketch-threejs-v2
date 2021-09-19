import * as THREE from 'three'

export default class PerspectiveCamera extends THREE.PerspectiveCamera {
  constructor() {
    const fov = 50
    const aspect = 1
    const near = 1
    const far = 1000

    super(fov, aspect, near, far)

    this.position.z = 100
    this.lookAt(0, 0, 0)
  }

  resize(resolution: THREE.Vector2) {
    this.aspect = resolution.x / resolution.y
    this.updateProjectionMatrix()
  }
}
