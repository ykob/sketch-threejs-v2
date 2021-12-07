import * as THREE from 'three'

export default class DirectionalLight extends THREE.DirectionalLight {
  constructor(color = 0xff0000, intensity = 0.5) {
    super(color, intensity)
  }
}
