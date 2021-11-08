import * as THREE from 'three'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Title from './Title'
import Water from './Water'
import Points from './Points'
import PointLight from './PointLight'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  texLoader = new THREE.TextureLoader()
  title = new Title()
  water = new Water()
  points = new Points()
  pointLight1 = new PointLight(0x33ff33, 0.5, 200)
  pointLight2 = new PointLight(0x3333ff, 0.2, 400)

  constructor() {
    this.pointLight1.position.set(0, 100, -15)
    this.pointLight2.position.set(0, 100, -15)
    this.scene.fog = new THREE.Fog(0x000000, 10, 500)
    this.scene.add(this.title)
    this.scene.add(this.water)
    this.scene.add(this.points)
    this.scene.add(this.pointLight1)
    this.scene.add(this.pointLight2)
  }

  async start() {
    const imgs = [
      require('@/assets/img/common/noise.png'),
      require('@/assets/img/common/water.jpg'),
      require('@/assets/img/home/title_fill.jpg'),
      require('@/assets/img/home/title_border.jpg'),
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
    renderer.setClearColor(0x000000, 1.0)
    this.title.update(time)
    this.water.update(time)
    this.water.render1(renderer, this.scene, this.camera)
    this.title.visible = false
    this.water.render2(renderer, this.scene, this.camera)
    this.title.visible = true
    renderer.setRenderTarget(this.target)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.water.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}