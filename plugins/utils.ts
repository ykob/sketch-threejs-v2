import { Plugin } from '@nuxt/types'
import { sleep } from '@/assets/js/utils'

declare module 'vue/types/vue' {
  interface Vue {
    $utils: {
      sleep(delay: number): Promise<void>
    }
  }
}

const utils: Plugin = (_, inject) => {
  inject('utils', {
    sleep,
  })
}

export default utils
