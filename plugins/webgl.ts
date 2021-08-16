import { Plugin } from '@nuxt/types'
import WebGLContent from '@/webgl'

const webgl: Plugin = (_, inject) => {
  inject('webgl', new WebGLContent())
}

declare module 'vue/types/vue' {
  interface Vue {
    $webgl: WebGLContent
  }
}

export default webgl
