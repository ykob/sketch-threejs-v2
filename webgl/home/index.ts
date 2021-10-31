import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Title from './Title'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  texLoader = new THREE.TextureLoader()
  title = new Title()

  constructor() {
    this.scene.add(this.title)
  }

  async start() {
    await Promise.all([
      this.texLoader.loadAsync(require('@/assets/img/common/noise.png')),
      this.texLoader.loadAsync(require('@/assets/img/home/title_fill.png')),
      this.texLoader.loadAsync(require('@/assets/img/home/title_border.png')),
    ])
    .then((response: THREE.Texture[]) => {
      this.title.start({
        tNoise: response[0],
        tTitleFill: response[1],
        tTitleBorder: response[2],
      })
    })
  }

  update(_time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setRenderTarget(this.target)
    this.title.update()
    renderer.setClearColor(0x000000, 1.0)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}