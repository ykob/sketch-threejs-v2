import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'

export default class Home {
  cameraPE: Camera
  camera: PerspectiveCamera

  target = new THREE.WebGLRenderTarget(0, 0)
  scene = new THREE.Scene()

  constructor() {
    this.cameraPE = new Camera()
    this.camera = new PerspectiveCamera()
  }

  update(_time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setRenderTarget(this.target)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}