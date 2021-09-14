import * as THREE from 'three'

export default class Camera extends THREE.PerspectiveCamera {
  constructor(width: number, height: number) {
    super()
    this.position.z = 1
    this.lookAt(0, 0, 0)
  }

  resize(width: number, height: number) {
    this.updateProjectionMatrix()
  }
}
