import * as THREE from 'three'

export default class PerspectiveCamera extends THREE.PerspectiveCamera {
  constructor() {
    const fov = 50
    const aspect = 1
    const near = 1
    const far = 1000

    super(fov, aspect, near, far)
  }

  resize(resolution: THREE.Vector2) {
    this.aspect = resolution.x / resolution.y
    this.updateProjectionMatrix()
    if (resolution.x / resolution.y > 1) {
      this.position.y = 0.4
      this.position.z = 7
      this.lookAt(0, 1.7, 0)
    } else {
      this.position.y = 0
      this.position.z = 10
      this.lookAt(0, 1.5, 0)
    }
  }
}
