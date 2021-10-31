import * as THREE from 'three'
import TitlePlane from './TitlePlane'

export default class Title extends THREE.Group {
  children: TitlePlane[]

  constructor() {
    super()
    this.children = []

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
    for (let index = 0; index < this.children.length; index++) {
      const obj = this.children[index]
      
      obj.update(time)
    }
  }
}
