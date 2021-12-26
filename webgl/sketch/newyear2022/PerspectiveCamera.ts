import * as THREE from 'three'

export default class PerspectiveCamera extends THREE.PerspectiveCamera {
  constructor() {
    const fov = 50
    const aspect = 1
    const near = 1
    const far = 1000

    super(fov, aspect, near, far)

    this.position.z = 6
    this.position.y = 2.4
    this.lookAt(0, 2, 0)
  }

  resize(resolution: THREE.Vector2) {
    this.aspect = resolution.x / resolution.y
    this.updateProjectionMatrix()
    this.position.z = resolution.x / resolution.y > 1 ? 6 : 6
  }
}
