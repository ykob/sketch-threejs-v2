import * as THREE from 'three'

export default class Camera extends THREE.OrthographicCamera {
  constructor(width: number, height: number) {
    super(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    this.position.z = 1
    this.lookAt(0, 0, 0)
  }

  resize(width: number, height: number) {
    this.left = width / -2
    this.right = width / 2
    this.top = height / 2
    this.bottom = height / -2
    this.updateProjectionMatrix()
  }
}
