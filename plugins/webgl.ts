import { Plugin } from '@nuxt/types'
import WebGLContent from '@/webgl'

const webgl: Plugin = ({ app }, inject) => {
  inject(
    'webgl',
    new WebGLContent({
      base: app?.router?.options?.base || '',
    })
  )
}

declare module 'vue/types/vue' {
  interface Vue {
    $webgl: WebGLContent
  }
}

export default webgl
