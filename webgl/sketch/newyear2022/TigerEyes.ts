import * as THREE from 'three'

export default class TigerEyes extends THREE.Mesh {
  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      color: 0x111109,
      metalness: 0.9,
      roughness: 0.3,
    })

    super(geometry, material)
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
    this.rotation.y = uniforms.time.value * 0.1
    this.rotation.z = uniforms.time.value * 0.05
  }
}
