import { UAParser } from 'ua-parser-js'
import * as THREE from 'three'
import Background from './common/Background'
import Camera from './common/Camera'
import DirectionalLight from './common/DirectionalLight'
import LoadingCore from './common/LoadingCore'
import Plane from './common/Plane'

const parser = new UAParser()
const os = parser.getOS().name

export default class WebGLContent {
  renderer: THREE.WebGLRenderer | null

  base = ''
  current = 0
  timer = 0
  path = ''

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  camera = new Camera()
  directionalLight1 = new DirectionalLight(0x66ffaa)
  directionalLight2 = new DirectionalLight(0x66aaff)
  plane = new Plane()
  background = new Background()
  loadingCore = new LoadingCore()
  sketches: any[] = []
  texLoader = new THREE.TextureLoader()
  cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512)
  cubeCamera = new THREE.CubeCamera(1, 2000, this.cubeRenderTarget)

  constructor({ base }: { base: string }) {
    this.base = base
    this.renderer = null
    this.directionalLight1.position.set(10, 10, 10)
    this.directionalLight2.position.set(-10, -10, 10)
    this.scene.add(this.directionalLight1)
    this.scene.add(this.directionalLight2)
    this.scene.add(this.plane)
    this.scene.add(this.background)
    this.scene.add(this.loadingCore)
    this.scene.add(this.cubeCamera)
  }

  async start(): Promise<void> {
    const canvas = document.getElementById('canvas-webgl')
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('#canvas-webgl is not HTMLCanvasElement.')
    }
    const imgs = [
      require('@/assets/img/common/mosaic.jpg'),
      require('@/assets/img/common/nebula.jpg'),
    ]

    await Promise.all([
      ...imgs.map((o) => {
        return this.texLoader.loadAsync(o)
      }),
    ]).then((response: THREE.Texture[]) => {
      this.plane.start(response[0])
      this.background.start(response[1])
      this.loadingCore.start(this.cubeRenderTarget.texture)
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
      this.renderer.setPixelRatio(os === 'iOS' || os === 'Android' ? 2 : 1)
      this.clock.start()
      this.update()
    })
  }

  update(): void {
    if (this.renderer === null) {
      return
    }
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    for (let i = 0; i < this.sketches.length; i++) {
      const sketch = this.sketches[i]
      if (
        sketch === undefined ||
        this.plane.sketchStatus[i].isDestroyed === true
      ) {
        continue
      }
      sketch.update(time, this.renderer)
    }
    this.plane.update(time)
    this.background.update(time)
    this.loadingCore.update(time)
    this.loadingCore.visible = false
    this.cubeCamera.position.copy(this.loadingCore.position)
    this.cubeCamera.update(this.renderer, this.scene)
    this.loadingCore.visible = true
    this.renderer.setRenderTarget(null)
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.update()
    })
  }

  resize(width: number, height: number): void {
    if (this.renderer === null) {
      return
    }
    this.resolution.set(width, height)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.camera.resize(this.resolution)
    this.plane.resize(this.resolution, this.camera)

    for (let i = 0; i < this.sketches.length; i++) {
      const sketch = this.sketches[i]
      if (sketch === undefined) {
        continue
      }
      sketch.resize(this.resolution)
    }
  }

  changeSketch(path: string): Promise<void> {
    return new Promise((resolve) => {
      clearTimeout(this.timer)
      this.plane.hideScene()
      this.timer = window.setTimeout(async () => {
        this.path = path
        const { Sketch } = await import(`.${path}`)
        const sketch = new Sketch()

        await sketch.start({
          os,
          base: this.base,
        })
        if (this.path === path) {
          sketch.resize(this.resolution)
          this.sketches[this.current] = sketch
          this.current = (this.current + 1) % 4
          this.plane.changeScene(sketch.target.texture)
        }
        resolve()
      }, 500)
    })
  }

  hideSketch(): Promise<void> {
    return new Promise(() => {
      clearTimeout(this.timer)
      this.plane.hideScene()
    })
  }
}
