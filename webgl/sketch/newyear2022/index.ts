import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import PerspectiveCamera from './PerspectiveCamera'
import DirectionalLight from './DirectionalLight'
import TigerHead from './TigerHead'
import { sleep } from '~/assets/js/utils'

export class Sketch {
  tigerHead: TigerHead | null

  target = new THREE.WebGLRenderTarget(1, 1)
  imgLoader = new THREE.ImageLoader()
  objLoader = new OBJLoader()
  scene = new THREE.Scene()
  camera = new PerspectiveCamera()
  directionalLight1 = new DirectionalLight(0xffffff, 1)

  constructor() {
    this.tigerHead = null
    this.directionalLight1.position.set(14, 10, 10)
    this.scene.add(this.directionalLight1)
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
      const child1 = response[0].children.find(o => o.name === 'TigerHead_Mesh')

      if (child1 instanceof THREE.Mesh) {
        this.tigerHead = new TigerHead(child1.geometry)
      }
      if (this.tigerHead !== null) this.scene.add(this.tigerHead)
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
    renderer.setClearColor(0x000000, 1.0)
    renderer.setRenderTarget(this.target)
    renderer.render(this.scene, this.camera)
  }

  resize(resolution: THREE.Vector2): void {
    this.camera.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
  }
}