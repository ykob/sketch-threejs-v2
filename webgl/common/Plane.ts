import * as THREE from 'three'
import { easing } from 'ts-easing'
import vs from './glsl/Plane.vs'
import fs from './glsl/Plane.fs'
import { MathEx } from '@/assets/js/utils'

interface SketchStatus {
  timeShow: number
  timeHide: number
  isShown: boolean
  isHidden: boolean
  isDestroyed: boolean
}

const MAX = 4
const DURATION = 4

export default class Plane extends THREE.Mesh {
  current: number
  sketchStatus: SketchStatus[]
  sx: number
  sy: number

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
          time: {
            value: 0,
          },
          normalMap: {
            value: null,
          },
          uvTransform1: {
            value: new THREE.Matrix3(),
          },
          uvTransform2: {
            value: new THREE.Matrix3(),
          },
          uvTransform3: {
            value: new THREE.Matrix3(),
          },
          uvTransform4: {
            value: new THREE.Matrix3(),
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
    this.sx = 0
    this.sy = 0
  }

  start(normalMap: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
  }

  resize(resolution: THREE.Vector2) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    this.sx = Math.min(resolution.x / resolution.y, 1)
    this.sy = Math.min(resolution.y / resolution.x, 1)
    uniforms.uvTransform1.value.setUvTransform(0, 0, this.sx, this.sy, 0, 0.5, 0.5)
    uniforms.uvTransform2.value.setUvTransform(0, 0, this.sx, this.sy, 0, 0.5, 0.5)
    uniforms.uvTransform3.value.setUvTransform(0, 0, this.sx, this.sy, 0, 0.5, 0.5)
    uniforms.uvTransform4.value.setUvTransform(0, 0, this.sx, this.sy, 0, 0.5, 0.5)
    this.scale.set(resolution.x, resolution.y, 1)
  }

  changeScene(t: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material
    const current = this.sketchStatus[this.current]
    const prev = this.sketchStatus[(this.current + MAX - 1) % MAX]
    const randomIndex = Math.floor(Math.random() * 4)
    let uvTransform: THREE.Matrix3 | undefined

    current.timeShow = 0
    current.timeHide = 0
    current.isShown = true
    current.isHidden = false
    current.isDestroyed = false
    prev.isHidden = true

    if (this.current === 0) {
      uniforms.texture1.value = t
      uvTransform = uniforms.uvTransform1.value
      this.current = 1
    } else if (this.current === 1) {
      uniforms.texture2.value = t
      uvTransform = uniforms.uvTransform2.value
      this.current = 2
    } else if (this.current === 2) {
      uniforms.texture3.value = t
      uvTransform = uniforms.uvTransform3.value
      this.current = 3
    } else if (this.current === 3) {
      uniforms.texture4.value = t
      uvTransform = uniforms.uvTransform4.value
      this.current = 0
    }
    if (uvTransform !== undefined) {
      uvTransform.setUvTransform(
        0,
        0,
        (randomIndex % 2 === 0) ? this.sx : this.sy,
        (randomIndex % 2 === 0) ? this.sy : this.sx,
        MathEx.radians(randomIndex * 90),
        0.5,
        0.5
      )
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

    uniforms.time.value += time
    for (let i = 0; i < this.sketchStatus.length; i++) {
      const status = this.sketchStatus[i]
      let stepShow
      let stepHide

      switch (i) {
        case 0:
          stepShow = uniforms.stepShow1
          stepHide = uniforms.stepHide1
          break
        case 1:
          stepShow = uniforms.stepShow2
          stepHide = uniforms.stepHide2
          break
        case 2:
          stepShow = uniforms.stepShow3
          stepHide = uniforms.stepHide3
          break
        case 3:
        default:
          stepShow = uniforms.stepShow4
          stepHide = uniforms.stepHide4
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
      stepShow.value = easing.outQuad(Math.max(Math.min(status.timeShow, DURATION), 0) / DURATION)
      stepHide.value = easing.outQuad(Math.max(Math.min(status.timeHide, DURATION), 0) / DURATION)
    }
  }
}
