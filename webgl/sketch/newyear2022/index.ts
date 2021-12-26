import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import PerspectiveCamera from './PerspectiveCamera'
import DirectionalLight from './DirectionalLight'
import TigerHead from './TigerHead'
import TigerEyes from './TigerEyes'
import { sleep } from '~/assets/js/utils'

export class Sketch {
  tigerHead: TigerHead | null
  tigerEyes: TigerEyes | null

  target = new THREE.WebGLRenderTarget(1, 1)
  imgLoader = new THREE.ImageLoader()
  objLoader = new OBJLoader()
  scene = new THREE.Scene()
  camera = new PerspectiveCamera()
  ambientLight = new THREE.AmbientLight(0xff9999)
  directionalLight1 = new DirectionalLight(0xffffff, 1)
  directionalLight2 = new DirectionalLight(0xffffff, 0.5)
  directionalLight3 = new DirectionalLight(0xffffff, 0.5)

  constructor() {
    this.tigerHead = null
    this.tigerEyes = null
    this.directionalLight1.position.set(5, 10, 5)
    this.directionalLight2.position.set(-10, 2, 5)
    this.directionalLight3.position.set(10, -2, 5)
    this.scene.add(this.ambientLight)
    this.scene.add(this.directionalLight1)
    this.scene.add(this.directionalLight2)
    this.scene.add(this.directionalLight3)
    this.scene.fog = new THREE.Fog(0x000000, 10, 500)
  }

  async start() {
    const imgPath = [
      require('@/assets/img/sketch/newyear2022/TigerHead.png'),
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
      const tigerHeadMesh = response[0].children.find(o => o.name === 'TigerHead_Mesh01')
      const tigerEyesMesh = response[0].children.find(o => o.name === 'TigerEyes_Mesh02')
      console.log(response)

      if (tigerHeadMesh instanceof THREE.Mesh) {
        this.tigerHead = new TigerHead(tigerHeadMesh.geometry)
      }
      if (this.tigerHead !== null) this.scene.add(this.tigerHead)
      if (tigerEyesMesh instanceof THREE.Mesh) {
        this.tigerEyes = new TigerEyes(tigerEyesMesh.geometry)
      }
      if (this.tigerEyes !== null) this.scene.add(this.tigerEyes)
    })
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i]
      const texture = new THREE.Texture(img)

      texture.needsUpdate = true
      textures.push(texture)
      await sleep(50)
    }
    if (this.tigerHead !== null) this.tigerHead.start(textures[0])
  }

  update(_time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setClearColor(0x550000, 1.0)
    renderer.setRenderTarget(this.target)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}