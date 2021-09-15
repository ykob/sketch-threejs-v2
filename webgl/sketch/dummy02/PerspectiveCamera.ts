import * as THREE from 'three'

export default class Camera extends THREE.PerspectiveCamera {
  constructor(width: number, height: number) {
    const fov = 50
    const aspect = width / height
    const near = 0
    const far = 1000

    super(fov, aspect, near, far)

    this.position.z = 1
    this.lookAt(0, 0, 0)
  }

  resize(width: number, height: number) {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}
