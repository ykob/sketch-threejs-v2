import * as THREE from 'three'
import PostEffectBright from '../../common/PostEffectBright'
import PostEffectBlur from '../../common/PostEffectBlur'
import PostEffectBloom from '../../common/PostEffectBloom'
import Camera from './Camera'
import PerspectiveCamera from './PerspectiveCamera'

export class Sketch {
  target = new THREE.WebGLRenderTarget(1, 1)
  target1 = new THREE.WebGLRenderTarget(1, 1)
  target2 = new THREE.WebGLRenderTarget(1, 1)
  target3 = new THREE.WebGLRenderTarget(1, 1)
  scenePE = new THREE.Scene()
  scene = new THREE.Scene()
  cameraPE = new Camera()
  camera = new PerspectiveCamera()
  postEffectBright = new PostEffectBright()
  postEffectBlurX = new PostEffectBlur()
  postEffectBlurY = new PostEffectBlur()
  postEffectBloom = new PostEffectBloom()

  constructor() {
    this.scene.fog = new THREE.Fog(0x000000, 10, 500)
  }

  start() {
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

  update(_time: number, renderer: THREE.WebGLRenderer): void {
    renderer.setClearColor(0x000000, 1.0)
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