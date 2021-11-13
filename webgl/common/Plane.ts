import * as THREE from 'three'
import vs from './glsl/Plane.vs'
import fs from './glsl/Plane.fs'

interface SketchStatus {
  timeShow: number
  timeHide: number
  isShown: boolean
  isHidden: boolean
  isDestroyed: boolean
}

const MAX = 4
const DURATION = 2

export default class Plane extends THREE.Mesh {
  current: number
  sketchStatus: SketchStatus[]

  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          durationAll: {
            value: DURATION,
          },
          texture1: {
            value: null,
          },
          texture2: {
            value: null,
          },
          texture3: {
            value: null,
          },
          texture4: {
            value: null,
          },
          timeShow1: {
            value: 0,
          },
          timeShow2: {
            value: 0,
          },
          timeShow3: {
            value: 0,
          },
          timeShow4: {
            value: 0,
          },
          timeHide1: {
            value: 0,
          },
          timeHide2: {
            value: 0,
          },
          timeHide3: {
            value: 0,
          },
          timeHide4: {
            value: 0,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
    })
    super(geometry, material)
    this.current = 0
    this.sketchStatus = [...new Array(MAX)].map(() => {
      return {
        timeShow: 0,
        timeHide: 0,
        isShown: false,
        isHidden: false,
        isDestroyed: false,
      }
    })
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x, resolution.y, 1)
  }

  changeScene(t: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material
    const current = this.sketchStatus[this.current]
    const prev = this.sketchStatus[(this.current + MAX - 1) % MAX]

    current.timeShow = 0
    current.timeHide = 0
    current.isShown = true
    current.isHidden = false
    current.isDestroyed = false
    prev.isHidden = true

    if (this.current === 0) {
      uniforms.texture1.value = t
      this.current = 1
    } else if (this.current === 1) {
      uniforms.texture2.value = t
      this.current = 2
    } else if (this.current === 2) {
      uniforms.texture3.value = t
      this.current = 3
    } else if (this.current === 3) {
      uniforms.texture4.value = t
      this.current = 0
    }
  }

  hideScene() {
    for (let i = 0; i < this.sketchStatus.length; i++) {
      const sketchStatus = this.sketchStatus[i]

      sketchStatus.isHidden = true
    }
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material

    for (let i = 0; i < this.sketchStatus.length; i++) {
      const status = this.sketchStatus[i]
      let timeShow
      let timeHide

      switch (i) {
        case 0:
          timeShow = uniforms.timeShow1
          timeHide = uniforms.timeHide1
          break
        case 1:
          timeShow = uniforms.timeShow2
          timeHide = uniforms.timeHide2
          break
        case 2:
          timeShow = uniforms.timeShow3
          timeHide = uniforms.timeHide3
          break
        case 3:
        default:
          timeShow = uniforms.timeShow4
          timeHide = uniforms.timeHide4
          break
      }
      if (status.isShown === true) {
        status.timeShow += time
      }
      if (status.isHidden === true) {
        status.timeHide += time
        if (status.timeHide >= DURATION) {
          status.isDestroyed = true
        }
      }
      timeShow.value = Math.max(Math.min(status.timeShow, DURATION), 0)
      timeHide.value = Math.max(Math.min(status.timeHide, DURATION), 0)
    }
  }
}
