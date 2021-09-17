import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Mesh from './Mesh'

export default class Home {
  target = new THREE.WebGLRenderTarget(0, 0)
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  mesh = new Mesh()

  constructor() {
    this.scene.add(this.mesh)
  }

  update(time: number, renderer: THREE.WebGLRenderer): void {
    // renderer.setRenderTarget(this.target)
    this.mesh.update(time)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
    console.log(this.camera)
  }
}