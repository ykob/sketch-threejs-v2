import * as THREE from 'three'
import vs from './glsl/TitlePlane.vs'
import fs from './glsl/TitlePlane.fs'

export default class TitlePlane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneGeometry(60, 30, 400, 200)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        {
          time: {
            value: 0,
          },
          alphaIndex: {
            value: 0,
          },
          tNoise: {
            value: null,
          },
          tTitleFill: {
            value: null,
          },
          tTitleBorder: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    })
    super(geometry, material)
  }

  start(
    { index, tNoise, tTitleFill, tTitleBorder }
    : {
      index: number
      tNoise: THREE.Texture
      tTitleFill: THREE.Texture
      tTitleBorder: THREE.Texture
    }
  ) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.alphaIndex.value = index
    uniforms.tNoise.value = tNoise
    uniforms.tTitleFill.value = tTitleFill
    uniforms.tTitleBorder.value = tTitleBorder
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
  }
}
