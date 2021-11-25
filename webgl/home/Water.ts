import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { Refractor } from 'three/examples/jsm/objects/Refractor.js'

import vs from './glsl/Water.vs'
import fs from './glsl/Water.fs'

export default class Water extends THREE.Mesh {
  reflector: Reflector
  refractor: Refractor
  target1: THREE.WebGLRenderTarget
  target2: THREE.WebGLRenderTarget

  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(1000, 1000)
    geometry.computeTangents()

    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.normalmap,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.fog,
        {
          time: {
            value: 0,
          },
          shininess: {
            value: 8,
          },
          reflectivity: {
            value: 0.001,
          },
          textureMatrix: {
            value: new THREE.Matrix4(),
          },
          tReflectionMap: {
            value: null,
          },
          tRefractionMap: {
            value: null,
          },
          resolution: {
            value: new THREE.Vector2(),
          },
          tDepth1: {
            value: null,
          },
          tDepth2: {
            value: null,
          },
          cameraNear: {
            value: 0.1,
          },
          cameraFar: {
            value: 1000,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(6, 6)
    material.uniforms.uvTransform.value.rotate((Math.PI / 180) * -30)
    material.uniforms.diffuse.value.set(0x440044)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshRipple'
    this.position.y = -16
    this.rotation.x = (Math.PI / 180) * -90

    const textureWidth = 1024
    const textureHeight = 1024
    const clipBias = 0
    const encoding = THREE.LinearEncoding

    // render targets
    this.target1 = new THREE.WebGLRenderTarget(0, 0)
    this.target2 = new THREE.WebGLRenderTarget(0, 0)
    this.target1.depthBuffer = this.target2.depthBuffer = true
    this.target1.depthTexture = new THREE.DepthTexture(0, 0)
    this.target2.depthTexture = new THREE.DepthTexture(0, 0)
    this.target1.depthTexture.format = this.target2.depthTexture.format =
      THREE.DepthFormat
    this.target1.depthTexture.type = this.target2.depthTexture.type =
      THREE.UnsignedIntType

    // Define Reflector and Refractor
    this.reflector = new Reflector(geometry, {
      textureWidth,
      textureHeight,
      clipBias,
      encoding,
    })
    this.refractor = new Refractor(geometry, {
      textureWidth,
      textureHeight,
      clipBias,
      encoding,
    })
    this.reflector.matrixAutoUpdate = false
    this.refractor.matrixAutoUpdate = false
    material.uniforms.tReflectionMap.value = this.reflector.getRenderTarget().texture
    material.uniforms.tRefractionMap.value = this.refractor.getRenderTarget().texture

    const dummyGeometry = new THREE.BufferGeometry()
    const dummyMaterial = new THREE.Material()
    const dummyGroup = new THREE.Group()
    this.onBeforeRender = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
      if (!(this.material instanceof THREE.RawShaderMaterial)) return
      const { uniforms } = this.material
  
      // prettier-ignore
      uniforms.textureMatrix.value.set(
        0.5, 0.0, 0.0, 0.5,
        0.0, 0.5, 0.0, 0.5,
        0.0, 0.0, 0.5, 0.5,
        0.0, 0.0, 0.0, 1.0
      )
      uniforms.textureMatrix.value.multiply(camera.projectionMatrix)
      uniforms.textureMatrix.value.multiply(camera.matrixWorldInverse)
      uniforms.textureMatrix.value.multiply(this.matrixWorld)
      this.visible = false
      this.reflector.matrixWorld.copy(this.matrixWorld)
      this.refractor.matrixWorld.copy(this.matrixWorld)
      this.reflector.onBeforeRender(renderer, scene, camera, dummyGeometry, dummyMaterial, dummyGroup)
      this.refractor.onBeforeRender(renderer, scene, camera, dummyGeometry, dummyMaterial, dummyGroup)
      this.visible = true
    }
  }

  start(normalMap: THREE.Texture) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
    uniforms.tDepth1.value = this.target1.depthTexture
    uniforms.tDepth2.value = this.target2.depthTexture
  }

  update(time: number) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.time.value += time
  }

  render1(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    this.visible = false
    renderer.setRenderTarget(this.target1)
    renderer.render(scene, camera)
  }

  render2(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return

    this.visible = true
    this.material.uniforms.tDepth2.value = null
    renderer.setRenderTarget(this.target2)
    renderer.render(scene, camera)
    this.material.uniforms.tDepth2.value = this.target2.depthTexture
  }

  resize(resolution: THREE.Vector2) {
    if (!(this.material instanceof THREE.RawShaderMaterial)) return
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
    this.target1.setSize(resolution.x, resolution.y)
    this.target2.setSize(resolution.x, resolution.y)
  }
}
