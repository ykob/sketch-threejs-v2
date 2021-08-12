import { Plugin } from '@nuxt/types'
import WebGLContent from '@/webgl'

const webgl: Plugin = (_, inject) => {
  inject('webgl', new WebGLContent())
}

export default webgl
