import * as THREE from 'three'
import TigerHead from './TigerHead'
import TigerEyes from './TigerEyes'

export default class Tiger extends THREE.Group {
  tigerHead: TigerHead | null
  tigerEyes: TigerEyes | null

  constructor() {
    super()
    this.tigerHead = null
    this.tigerEyes = null
  }

  start(group: THREE.Group) {
    const tigerHeadMesh = group.children.find(o => o.name === 'TigerHead_Mesh01')
    const tigerEyesMesh = group.children.find(o => o.name === 'TigerEyes_Mesh02')

    if (tigerHeadMesh instanceof THREE.Mesh) {
      this.tigerHead = new TigerHead(tigerHeadMesh.geometry)
      this.add(this.tigerHead)
    }
    if (tigerEyesMesh instanceof THREE.Mesh) {
      this.tigerEyes = new TigerEyes(tigerEyesMesh.geometry)
      this.add(this.tigerEyes)
    }
  }

  setTexture(texture: THREE.Texture) {
    this.tigerHead?.start(texture)
  }

  update(_time: number) {
  }
}
