import * as THREE from 'three'

export default class LoadingCore extends THREE.Mesh {
  time: number

  constructor() {
    const geometry = new THREE.OctahedronGeometry(20, 0)
    const material = new THREE.MeshPhongMaterial({
      reflectivity: 0.1,
      flatShading: true,
    })

    super(geometry, material)

    this.position.z = -20
    this.time = 0
  }

  start(map: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshPhongMaterial)) return
    this.material.map = map
  }

  update(time: number) {
    if (!(this.material instanceof THREE.MeshPhongMaterial)) return
    this.time += time
    this.rotation.x = this.time
    this.rotation.y = this.time
  }
}
