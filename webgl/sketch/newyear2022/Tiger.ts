import * as THREE from 'three'
import TigerHead from './TigerHead'
import TigerEyes from './TigerEyes'
import TigerBody from './TigerBody'
import TigerHandRight from './TigerHandRight'
import TigerHandLeft from './TigerHandLeft'

export default class Tiger extends THREE.Group {
  head: TigerHead | null
  eyes: TigerEyes | null
  body: TigerBody | null
  handRight: TigerHandRight | null
  handLeft: TigerHandLeft | null
  time: number

  constructor() {
    super()
    this.head = null
    this.eyes = null
    this.body = null
    this.handRight = null
    this.handLeft = null
    this.time = 0
  }

  start(group: THREE.Group) {
    const headMesh = group.children.find(o => o.name === 'TigerHead_Mesh01')
    const eyesMesh = group.children.find(o => o.name === 'TigerEyes_Mesh02')
    const bodyMesh = group.children.find(o => o.name === 'TigerBody_Mesh03')
    const handRightMesh = group.children.find(o => o.name === 'TigerHandRight_Mesh04')
    const handLeftMesh = group.children.find(o => o.name === 'TigerHandLeft_Mesh05')

    if (headMesh instanceof THREE.Mesh) {
      this.head = new TigerHead(headMesh.geometry)
      this.add(this.head)
    }
    if (eyesMesh instanceof THREE.Mesh) {
      this.eyes = new TigerEyes(eyesMesh.geometry)
      this.add(this.eyes)
    }
    if (bodyMesh instanceof THREE.Mesh) {
      this.body = new TigerBody(bodyMesh.geometry)
      this.add(this.body)
    }
    if (handRightMesh instanceof THREE.Mesh) {
      this.handRight = new TigerHandRight(handRightMesh.geometry)
      this.add(this.handRight)
    }
    if (handLeftMesh instanceof THREE.Mesh) {
      this.handLeft = new TigerHandLeft(handLeftMesh.geometry)
      this.add(this.handLeft)
    }
  }

  setTexture({ textureHead, textureBody, textureHand }: { [key: string]: THREE.Texture }) {
    this.head?.start(textureHead)
    this.body?.start(textureBody)
    this.handRight?.start(textureHand)
    this.handLeft?.start(textureHand)
  }

  update(time: number) {
    this.time += time

    const sin = Math.sin(this.time * 2)

    this.position.y = sin * 0.2
    this.head?.update(time)
    this.eyes?.update(time)
    this.body?.update(time)
    this.handRight?.update(time)
    this.handLeft?.update(time)
  }
}
