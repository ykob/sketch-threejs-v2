import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import PerspectiveCamera from './PerspectiveCamera'
import DirectionalLight from './DirectionalLight'
import Tiger from './Tiger'
import BackCircle from './BackCircle'
import Points from './Points'
import Background from './Background'
import { sleep } from '~/assets/js/utils'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  imgLoader = new THREE.ImageLoader()
  objLoader = new OBJLoader()
  scene = new THREE.Scene()
  camera = new PerspectiveCamera()
  tiger = new Tiger()
  backCircle = new BackCircle()
  points = new Points()
  background = new Background()
  ambientLight = new THREE.AmbientLight(0xff9999)
  directionalLight1 = new DirectionalLight(0xffffff, 0.8)
  directionalLight2 = new DirectionalLight(0xffffff, 0.3)
  directionalLight3 = new DirectionalLight(0xffffff, 0.3)

  constructor() {
    this.directionalLight1.position.set(5, 10, 5)
    this.directionalLight2.position.set(-10, 2, 5)
    this.directionalLight3.position.set(10, -2, 5)
    this.scene.fog = new THREE.Fog(0x000000, 10, 30)
    this.scene.add(this.tiger)
    this.scene.add(this.backCircle)
    this.scene.add(this.points)
    this.scene.add(this.background)
    this.scene.add(this.ambientLight)
    this.scene.add(this.directionalLight1)
    this.scene.add(this.directionalLight2)
    this.scene.add(this.directionalLight3)
  }

  async start() {
    const imgPath = [
      require('@/assets/img/sketch/newyear2022/TigerHead.png'),
      require('@/assets/img/sketch/newyear2022/TigerBody.png'),
      require('@/assets/img/sketch/newyear2022/TigerHand.png'),
      require('@/assets/img/sketch/newyear2022/BackCircleIn.png'),
      require('@/assets/img/sketch/newyear2022/BackCircleOut.png'),
      require('@/assets/img/sketch/newyear2022/nebula.jpg'),
    ]
    const objPath = [
      '/obj/sketch/newyear2022/Tiger.obj',
    ]
    const textures: THREE.Texture[] = []
    let imgs: HTMLImageElement[] = []

    await Promise.all([
      ...imgPath.map((o) => {
        return this.imgLoader.loadAsync(o)
      }),
    ])
    .then((response: HTMLImageElement[]) => {
      imgs = response
    })
    await Promise.all([
      ...objPath.map((o) => {
        return this.objLoader.loadAsync(o)
      }),
    ])
    .then((response: THREE.Group[]) => {
      this.tiger.start(response[0])
      this.backCircle.start(response[0])
    })
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i]
      const texture = new THREE.Texture(img)

      texture.needsUpdate = true
      textures.push(texture)
      await sleep(100)
    }
    this.tiger.setTexture({
      textureHead: textures[0],
      textureBody: textures[1],
      textureHand: textures[2],
    })
    this.backCircle.setTexture({
      textureIn: textures[3],
      textureOut: textures[4],
    })
    this.background.start(textures[5])
  }

  update(time: number, renderer: THREE.WebGLRenderer): void {
    this.tiger.update(time)
    this.backCircle.update(time)
    this.points.update(time)
    this.background.update(time)
    renderer.setClearColor(0x770000, 1.0)
    renderer.setRenderTarget(this.target)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.camera.resize(resolution)
    this.points.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}