import { Plugin } from '@nuxt/types'
import { sleep, MathEx } from '@/assets/js/utils'

declare module 'vue/types/vue' {
  interface Vue {
    $utils: {
      sleep(delay: number): Promise<void>
      MathEx: {
        degrees(radian: number): number
        radians(degree: number): number
        clamp(value: number, min: number, max: number): number
        mix(x1: number, x2: number, a: number): number
        step(e: number, x: number): number
        smoothstep(e0: number, e1: number, x: number): number | undefined
        spherical(radian1: number, radian2: number, radius: number): number[]
        randomArbitrary(min: number, max: number): number
        randomInt(min: number, max: number): number
      }
    }
  }
}

const utils: Plugin = (_, inject) => {
  inject('utils', {
    sleep,
    MathEx,
  })
}

export default utils
