import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Title from './Title'
import Water from './Water'
import DirectionalLight from './DirectionalLight'
import PointLight from './PointLight'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  texLoader = new THREE.TextureLoader()
  title = new Title()
  water = new Water()
  dirLight1 = new DirectionalLight(0xff0000, 0.4)
  dirLight2 = new DirectionalLight(0x0000ff, 0.4)
  pointLight1 = new PointLight(0xff3333, 0.6, 600)
  pointLight2 = new PointLight(0x3333ff, 0.6, 600)

  constructor() {
    this.dirLight1.position.set(-20, 10, -20)
    this.dirLight2.position.set(-20, 10, -20)
    this.pointLight1.position.set(-5, 200, -400)
    this.pointLight2.position.set(5, 200, -400)
    this.scene.add(this.title)
    this.scene.add(this.water)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.pointLight1)
    this.scene.add(this.pointLight2)
  }

  async start() {
    const imgs = [
      require('@/assets/img/common/noise.png'),
      require('@/assets/img/common/water.jpg'),
      require('@/assets/img/home/title_fill.png'),
      require('@/assets/img/home/title_border.png'),
    ]
    await Promise.all([
      ...imgs.map((o) => {
        return this.texLoader.loadAsync(o)
      }),
    ])
    .then((response: THREE.Texture[]) => {
      response[0].wrapT = response[0].wrapS = THREE.RepeatWrapping
      this.title.start({
        tNoise: response[0],
        tTitleFill: response[2],
        tTitleBorder: response[3],
      })
      response[1].wrapT = response[1].wrapS = THREE.RepeatWrapping
      this.water.start(response[1])
    })
  }

  update(time: number, renderer: THREE.WebGLRenderer): void {
    this.title.update(time)
    this.water.update(time)
    this.water.render1(renderer, this.scene, this.camera)
    this.title.visible = false
    this.water.render2(renderer, this.scene, this.camera)
    this.title.visible = true
    renderer.setRenderTarget(this.target)
    renderer.setClearColor(0x000000, 1.0)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.water.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}