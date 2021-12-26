import * as THREE from 'three'

export default class TigerHead extends THREE.Mesh {
  constructor(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.62,
    })

    super(geometry, material)
  }

  start(texture: THREE.Texture) {
    if (!(this.material instanceof THREE.MeshStandardMaterial)) return
    this.material.map = texture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
    this.rotation.y = uniforms.time.value * 0.1
    this.rotation.z = uniforms.time.value * 0.05
  }
}
