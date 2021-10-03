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
const DURATION = 1

export default class Plane extends THREE.Mesh {
  current: number
  sketchStatus: SketchStatus[]

  constructor() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
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
          stepShow1: {
            value: 0,
          },
          stepShow2: {
            value: 0,
          },
          stepShow3: {
            value: 0,
          },
          stepShow4: {
            value: 0,
          },
          stepHide1: {
            value: 0,
          },
          stepHide2: {
            value: 0,
          },
          stepHide3: {
            value: 0,
          },
          stepHide4: {
            value: 0,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
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

    this.sketchStatus[this.current].timeShow = 0
    this.sketchStatus[this.current].timeHide = 0
    this.sketchStatus[this.current].isShown = true
    this.sketchStatus[this.current].isHidden = false
    this.sketchStatus[this.current].isDestroyed = false
    this.sketchStatus[(this.current + MAX - 1) % MAX].isHidden = true

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

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    // const { uniforms } = this.material

    for (let i = 0; i < this.sketchStatus.length; i++) {
      const status = this.sketchStatus[i]

      if (status.isShown === true) {
        status.timeShow += time
      }
      if (status.isHidden === true) {
        status.timeHide += time
        if (status.timeHide >= DURATION) {
          status.isDestroyed = true
        }
      }
    }
  }
}
