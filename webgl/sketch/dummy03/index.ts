import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Mesh from './Mesh'
import { sleep } from '@/assets/js/utils'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  mesh = new Mesh()

  constructor() {
    this.scene.add(this.mesh)
  }

  async start() {
    await sleep(100)
  }

  update(time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setRenderTarget(this.target)
    this.mesh.update(time)
    renderer.setClearColor(0x0000ff, 1.0)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}