import * as THREE from 'three'

export default class PointLight extends THREE.PointLight {
  constructor(color = 0xff0000, intensity = 0.5, distance = 100, decay = 1) {
    super(color, intensity, distance, decay)
  }
}
