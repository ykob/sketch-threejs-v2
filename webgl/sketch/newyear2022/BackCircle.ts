import * as THREE from 'three'
import BackCircleIn from './BackCircleIn'
import BackCircleOut from './BackCircleOut'

export default class Tiger extends THREE.Group {
  backCircleIn: BackCircleIn | null
  backCircleOut: BackCircleOut | null
  time: number

  constructor() {
    super()
    this.backCircleIn = null
    this.backCircleOut = null
    this.time = 0
  }

  start(group: THREE.Group) {
    const backCircleInMesh = group.children.find(
      (o) => o.name === 'BackCircleIn_Mesh06'
    )
    const backCircleOutMesh = group.children.find(
      (o) => o.name === 'BackCircleOut_Mesh07'
    )

    if (backCircleInMesh instanceof THREE.Mesh) {
      this.backCircleIn = new BackCircleIn(backCircleInMesh.geometry)
      this.add(this.backCircleIn)
    }
    if (backCircleOutMesh instanceof THREE.Mesh) {
      this.backCircleOut = new BackCircleOut(backCircleOutMesh.geometry)
      this.add(this.backCircleOut)
    }
  }

  setTexture({ textureIn, textureOut }: { [key: string]: THREE.Texture }) {
    this.backCircleIn?.start(textureIn)
    this.backCircleOut?.start(textureOut)
  }

  update(time: number) {
    this.time += time
    this.backCircleIn?.update(time)
    this.backCircleOut?.update(time)
  }
}
