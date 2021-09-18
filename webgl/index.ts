import * as THREE from 'three'
import Camera from './common/Camera'
import Plane from './common/Plane'
import Home from './home'

export default class WebGLContent {
  renderer: THREE.WebGLRenderer | null

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  camera = new Camera()
  plane = new Plane()

  home = new Home()

  constructor() {
    this.renderer = null
    this.scene.add(this.plane)
    this.plane.setTexture(this.home.target.texture)
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
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.camera.resize(this.resolution)
    this.plane.resize(this.resolution)
    this.home.resize(this.resolution)
  }
}