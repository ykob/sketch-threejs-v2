import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'

export default class Home {
  cameraPE: Camera
  camera: PerspectiveCamera

  target = new THREE.WebGLRenderTarget(0, 0)
  scene = new THREE.Scene()

  constructor(width: number, height: number) {
    this.cameraPE = new Camera(width, height)
    this.camera = new PerspectiveCamera(width, height)
  }

  update(_time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setRenderTarget(this.target)
  }

  resize(width: number, height: number): void {
    this.cameraPE.resize(width, height)
    this.camera.resize(width, height)
    this.target.setSize(width, height)
  }
}