import * as THREE from 'three'
import Camera from './common/Camera'
import Plane from './common/Plane'

export default class WebGLContent {
  renderer: THREE.WebGLRenderer | null

  current = 0
  timer = 0
  path = ''

  resolution = new THREE.Vector2()
  clock = new THREE.Clock(false)
  scene = new THREE.Scene()
  camera = new Camera()
  plane = new Plane()
  sketches: any[] = []
  texLoader = new THREE.TextureLoader()

  constructor() {
    this.renderer = null
    this.scene.add(this.plane)
  }

  async start(): Promise<void> {
    const canvas = document.getElementById('canvas-webgl')
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('#canvas-webgl is not HTMLCanvasElement.')
    }
    const imgs = [
      require('@/assets/img/common/mosaic.jpg'),
    ]

    await Promise.all([
      ...imgs.map((o) => {
        return this.texLoader.loadAsync(o)
      }),
    ])
    .then((response: THREE.Texture[]) => {
      response[0].wrapT = response[0].wrapS = THREE.RepeatWrapping
      this.plane.start(response[0])
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
      this.renderer.setPixelRatio(2)
      this.clock.start()
      this.update()
    })
  }

  update(): void {
    if (this.renderer === null) return
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    for (let i = 0; i < this.sketches.length; i++) {
      const sketch = this.sketches[i]
      if (
        sketch === undefined
        || this.plane.sketchStatus[i].isDestroyed === true
      ) continue
      sketch.update(time, this.renderer)
    }
    this.plane.update(time)
    this.renderer.setRenderTarget(null)
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.update()
    })
  }

  resize(width: number, height: number): void {
    if (this.renderer === null) return
    this.resolution.set(width, height)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.camera.resize(this.resolution)
    this.plane.resize(this.resolution)

    for (let i = 0; i < this.sketches.length; i++) {
      const sketch = this.sketches[i]
      if (sketch === undefined) continue
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
  
        await sketch.start()
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
}