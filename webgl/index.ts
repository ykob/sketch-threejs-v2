import * as THREE from 'three'
import Camera from './Camera'
import Home from './home'

export default class WebGLContent {
  renderer: THREE.WebGLRenderer | null

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  home = new Home()
  camera = new Camera(1, 1)

  constructor() {
    this.renderer = null
  }

  start(): void {
    const canvas = document.getElementById('canvas-webgl')
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('#canvas-webgl is not HTMLCanvasElement.')
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 1.0)
    this.clock.start()
    this.update()
  }

  update(): void {
    if (this.renderer === null) return
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    this.home.update(time, this.renderer)
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.update()
    })
  }

  resize(width: number, height: number): void {
    if (this.renderer === null) return
    this.resolution.set(width, height)
    this.camera.resize(this.resolution.x, this.resolution.y)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.home.resize(this.resolution)
  }
}