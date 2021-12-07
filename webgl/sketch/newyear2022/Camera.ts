import * as THREE from 'three'

export default class Camera extends THREE.OrthographicCamera {
  constructor() {
    super(0, 0, 0, 0, 0.1, 1500)
    this.position.z = 1
    this.lookAt(0, 0, 0)
  }

  resize(resolution: THREE.Vector2) {
    this.left = resolution.x / -2
    this.right = resolution.x / 2
    this.top = resolution.y / 2
    this.bottom = resolution.y / -2
    this.updateProjectionMatrix()
  }
}
