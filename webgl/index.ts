import * as THREE from 'three'
import Camera from './Camera'

export default class WebGLContent {
  renderer: THREE.WebGLRenderer
  camera: Camera

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()

  constructor() {
    const canvas = document.getElementById('canvas-webgl')
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('#canvas-webgl is not HTMLCanvasElement.')
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 1.0)
    this.camera = new Camera(1, 1)
  }

  start(): void {
    this.clock.start()
  }

  update(): void {
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    this.renderer.render(this.scene, this.camera)
  }

  resize(width: number, height: number): void {
    this.resolution.set(width, height)
    this.camera.resize(this.resolution.x, this.resolution.y)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }
}