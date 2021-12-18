import * as THREE from 'three'

export default class DirectionalLight extends THREE.DirectionalLight {
  constructor(color = 0xff0000, intensity = 1.0) {
    super(color, intensity)
  }
}
