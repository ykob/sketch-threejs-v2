import * as THREE from 'three'

export default class PerspectiveCamera extends THREE.PerspectiveCamera {
  constructor() {
    const fov = 70
    const aspect = 1
    const near = 1
    const far = 1000

    super(fov, aspect, near, far)
    this.position.y = 0.5
  }

  resize(resolution: THREE.Vector2) {
    this.aspect = resolution.x / resolution.y
    this.updateProjectionMatrix()
    if (resolution.x / resolution.y > 1) {
      this.position.z = 6
      this.lookAt(0, 1.5, 0)
    } else {
      this.position.z = 8
      this.lookAt(0, 1.5, 0)
    }
  }
}
