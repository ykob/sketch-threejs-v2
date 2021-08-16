import { Plugin } from '@nuxt/types'

const sleep = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

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
