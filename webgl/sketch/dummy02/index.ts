import * as THREE from 'three'
import Camera from './Camera'

export default class Home {
  target = new THREE.WebGLRenderTarget(0, 0)
  scene = new THREE.Scene()
  camera = new Camera(1, 1)

  update(time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setRenderTarget(this.target)
  }

  resize(width: number, height: number): void {
    this.camera.resize(width, height)
    this.target.setSize(width, height)
  }
}