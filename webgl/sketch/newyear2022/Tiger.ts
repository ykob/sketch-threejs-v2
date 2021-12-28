import * as THREE from 'three'
import TigerHead from './TigerHead'
import TigerEyes from './TigerEyes'
import TigerBody from './TigerBody'
import TigerHandRight from './TigerHandRight'
import TigerHandLeft from './TigerHandLeft'

export default class Tiger extends THREE.Group {
  tigerHead: TigerHead | null
  tigerEyes: TigerEyes | null
  tigerBody: TigerBody | null
  tigerHandRight: TigerHandRight | null
  tigerHandLeft: TigerHandLeft | null

  constructor() {
    super()
    this.tigerHead = null
    this.tigerEyes = null
    this.tigerBody = null
    this.tigerHandRight = null
    this.tigerHandLeft = null
  }

  start(group: THREE.Group) {
    const tigerHeadMesh = group.children.find(o => o.name === 'TigerHead_Mesh01')
    const tigerEyesMesh = group.children.find(o => o.name === 'TigerEyes_Mesh02')
    const tigerBodyMesh = group.children.find(o => o.name === 'TigerBody_Mesh03')
    const tigerHandRightMesh = group.children.find(o => o.name === 'TigerHandRight_Mesh04')
    const tigerHandLeftMesh = group.children.find(o => o.name === 'TigerHandLeft_Mesh05')

    if (tigerHeadMesh instanceof THREE.Mesh) {
      this.tigerHead = new TigerHead(tigerHeadMesh.geometry)
      this.add(this.tigerHead)
    }
    if (tigerEyesMesh instanceof THREE.Mesh) {
      this.tigerEyes = new TigerEyes(tigerEyesMesh.geometry)
      this.add(this.tigerEyes)
    }
    if (tigerBodyMesh instanceof THREE.Mesh) {
      this.tigerBody = new TigerBody(tigerBodyMesh.geometry)
      this.add(this.tigerBody)
    }
    if (tigerHandRightMesh instanceof THREE.Mesh) {
      this.tigerHandRight = new TigerHandRight(tigerHandRightMesh.geometry)
      this.add(this.tigerHandRight)
    }
    if (tigerHandLeftMesh instanceof THREE.Mesh) {
      this.tigerHandLeft = new TigerHandLeft(tigerHandLeftMesh.geometry)
      this.add(this.tigerHandLeft)
    }
  }

  setTexture({ textureHead, textureBody }: { [key: string]: THREE.Texture }) {
    this.tigerHead?.start(textureHead)
    this.tigerBody?.start(textureBody)
  }

  update(_time: number) {
  }
}
