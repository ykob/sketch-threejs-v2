import * as THREE from 'three'
import vs from './glsl/Plane.vs'
import fs from './glsl/Plane.fs'

const DURATION = 1

export default class Plane extends THREE.Mesh {
  current: number
  isShown: boolean[]
  isHidden: boolean[]
  isDestroyed: boolean[]

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
    })
    super(geometry, material)
    this.current = 0
    this.isShown = [false, false, false, false]
    this.isHidden = [false, false, false, false]
    this.isDestroyed = [false, false, false, false]
  }

  resize(resolution: THREE.Vector2) {
    this.scale.set(resolution.x, resolution.y, 1)
  }

  changeScene(t: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material
    
    if (this.current === 0) {
      uniforms.texture1.value = t
      uniforms.timeShow1.value = 0
      uniforms.timeHide1.value = 0
      this.isShown[0] = true
      this.isHidden[0] = false
      this.isDestroyed[0] = false
      this.isHidden[3] = true
      this.current = 1
    } else if (this.current === 1) {
      uniforms.texture2.value = t
      uniforms.timeShow2.value = 0
      uniforms.timeHide2.value = 0
      this.isShown[1] = true
      this.isHidden[1] = false
      this.isDestroyed[1] = false
      this.isHidden[0] = true
      this.current = 2
    } else if (this.current === 2) {
      uniforms.texture3.value = t
      uniforms.timeShow3.value = 0
      uniforms.timeHide3.value = 0
      this.isShown[2] = true
      this.isHidden[2] = false
      this.isDestroyed[2] = false
      this.isHidden[1] = true
      this.current = 3
    } else if (this.current === 3) {
      uniforms.texture4.value = t
      uniforms.timeShow4.value = 0
      uniforms.timeHide4.value = 0
      this.isShown[3] = true
      this.isHidden[3] = false
      this.isDestroyed[3] = false
      this.isHidden[2] = true
      this.current = 0
    }
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    const { uniforms } = this.material

    if (this.isShown[0] === true) {
      uniforms.timeShow1.value += time
    }
    if (this.isShown[1] === true) {
      uniforms.timeShow2.value += time
    }
    if (this.isShown[2] === true) {
      uniforms.timeShow3.value += time
    }
    if (this.isShown[3] === true) {
      uniforms.timeShow4.value += time
    }
    if (this.isHidden[0] === true) {
      uniforms.timeHide1.value += time
      if (uniforms.timeHide1.value >= DURATION) {
        this.isDestroyed[0] = true
      }
    }
    if (this.isHidden[1] === true) {
      uniforms.timeHide2.value += time
      if (uniforms.timeHide2.value >= DURATION) {
        this.isDestroyed[1] = true
      }
    }
    if (this.isHidden[2] === true) {
      uniforms.timeHide3.value += time
      if (uniforms.timeHide3.value >= DURATION) {
        this.isDestroyed[2] = true
      }
    }
    if (this.isHidden[3] === true) {
      uniforms.timeHide4.value += time
      if (uniforms.timeHide4.value >= DURATION) {
        this.isDestroyed[3] = true
      }
    }
  }
}
