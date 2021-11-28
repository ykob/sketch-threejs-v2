import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import PostEffectBright from '../common/PostEffectBright'
import PostEffectBlur from '../common/PostEffectBlur'
import PostEffectBloom from '../common/PostEffectBloom'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'
import Title from './Title'
import Water from './Water'
import Points from './Points'
import Sphere from './Sphere'
import PointLight from './PointLight'
import { sleep } from '~/assets/js/utils'

export class Sketch {
  sphere: Sphere | null

  target = new THREE.WebGLRenderTarget(1, 1)
  target1 = new THREE.WebGLRenderTarget(1, 1)
  target2 = new THREE.WebGLRenderTarget(1, 1)
  target3 = new THREE.WebGLRenderTarget(1, 1)
  scenePE = new THREE.Scene()
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  imgLoader = new THREE.ImageLoader()
  objLoader = new OBJLoader()
  title = new Title()
  water = new Water()
  points = new Points()
  pointLight1 = new PointLight(0x22ff22, 0.65, 200)
  pointLight2 = new PointLight(0x2222dd, 0.25, 400)
  postEffectBright = new PostEffectBright()
  postEffectBlurX = new PostEffectBlur()
  postEffectBlurY = new PostEffectBlur()
  postEffectBloom = new PostEffectBloom()

  constructor() {
    this.sphere = null
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
    const imgPath = [
      require('@/assets/img/common/noise.png'),
      require('@/assets/img/common/water.jpg'),
      require('@/assets/img/home/title_fill.jpg'),
      require('@/assets/img/home/title_border.jpg'),
    ]
    const objPath = [
      '/obj/home/Polyhedron.obj',
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
      const child1 = response[0].children[0]
      if (child1 instanceof THREE.Mesh) {
        this.sphere = new Sphere(child1.geometry)
      }
      if (this.sphere !== null) this.scene.add(this.sphere)
    })
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i]
      const texture = new THREE.Texture(img)

      texture.needsUpdate = true
      textures.push(texture)
      await sleep(50)
    }
    textures[0].wrapT = textures[0].wrapS = THREE.RepeatWrapping
    this.title.start({
      tNoise: textures[0],
      tTitleFill: textures[2],
      tTitleBorder: textures[3],
    })
    textures[1].wrapT = textures[1].wrapS = THREE.RepeatWrapping
    this.water.start(textures[1])
    this.points.start(textures[0])
    this.postEffectBright.start(this.target1.texture)
    this.postEffectBlurX.start({
      texture: this.target2.texture,
      x: 1,
      y: 0,
    })
    this.postEffectBlurY.start({
      texture: this.target3.texture,
      x: 0,
      y: 1,
    })
    this.postEffectBloom.start({
      texture1: this.target1.texture,
      texture2: this.target2.texture,
    })
  }

  update(time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setClearColor(0x000000, 1.0)
    this.title.update(time)
    this.water.update(time)
    this.points.update(time)
    if (this.sphere !== null) this.sphere.update(time)
    this.title.visible = false
    this.points.visible = false
    if (this.sphere !== null) this.sphere.visible = false
    this.water.render1(renderer, this.scene, this.camera)
    this.water.render2(renderer, this.scene, this.camera)
    this.title.visible = true
    this.points.visible = true
    if (this.sphere !== null) this.sphere.visible = true
    renderer.setRenderTarget(this.target1)
    renderer.render(this.scene, this.camera)

    this.scenePE.add(this.postEffectBright)
    renderer.setRenderTarget(this.target2)
    renderer.render(this.scenePE, this.cameraPE)
    this.scenePE.remove(this.postEffectBright)
    this.scenePE.add(this.postEffectBlurX)
    renderer.setRenderTarget(this.target3)
    renderer.render(this.scenePE, this.cameraPE)
    this.scenePE.remove(this.postEffectBlurX)
    this.scenePE.add(this.postEffectBlurY)
    renderer.setRenderTarget(this.target2)
    renderer.render(this.scenePE, this.cameraPE)
    this.scenePE.remove(this.postEffectBlurY)
    this.scenePE.add(this.postEffectBloom)
    renderer.setRenderTarget(this.target)
    renderer.render(this.scenePE, this.cameraPE)
    this.scenePE.remove(this.postEffectBloom)
  }

  resize(resolution: THREE.Vector2): void {
    this.cameraPE.resize(resolution)
    this.camera.resize(resolution)
    this.water.resize(resolution)
    this.points.resize(resolution)
    this.postEffectBright.resize(resolution)
    this.postEffectBlurX.resize(resolution)
    this.postEffectBlurY.resize(resolution)
    this.postEffectBloom.resize(resolution)
    this.target.setSize(resolution.x, resolution.y)
    this.target1.setSize(resolution.x, resolution.y)
    this.target2.setSize(resolution.x / 4, resolution.y / 4)
    this.target3.setSize(resolution.x / 4, resolution.y / 4)
  }
}