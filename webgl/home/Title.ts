import * as THREE from 'three'
import TitlePlane from './TitlePlane'
import { MathEx } from '@/assets/js/utils'

export default class Title extends THREE.Group {
  children: TitlePlane[]
  datePrev: number
  noiseStrength: number

  constructor() {
    super()
    this.children = []
    this.datePrev = 0
    this.noiseStrength = 0

    for (let i = 0; i < 3; i++) {
      this.add(new TitlePlane())
    }
    for (let i = 0; i < 3; i++) {
      this.add(new TitlePlane())
    }
  }

  start(
    { tNoise, tTitleFill, tTitleBorder }
    : {
      tNoise: THREE.Texture
      tTitleFill: THREE.Texture
      tTitleBorder: THREE.Texture
    }
  ) {
    for (let index = 0; index < this.children.length; index++) {
      const obj = this.children[index]
      
      obj.start({ index, tNoise, tTitleFill, tTitleBorder })
    }
  }

  update(time: number) {
    const dateNow = Date.now()

    if (dateNow - this.datePrev > 1 / 10 * 1000) {
      this.noiseStrength = MathEx.smoothstep(0.4, 1.0, Math.random() * Math.random()) * 0.97 + 0.03
      this.datePrev = dateNow
    }

    for (let index = 0; index < this.children.length; index++) {
      const obj = this.children[index]
      
      obj.update(time, this.noiseStrength)
    }
  }
}
