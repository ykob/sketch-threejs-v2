<template>
  <div>
    <Header />
    <Nuxt />
    <canvas id="canvas-webgl" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { sleep } from '@ykob/js-util'

export default Vue.extend({
  async mounted() {
    const { commit } = this.$store
    let timer: number = 0

    const debounceSetSize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        this.setSize()
      }, 200)
    }

    await this.$webgl.start()
    this.setSize()

    window.addEventListener('resize', debounceSetSize)
    window.addEventListener('orientationchange', debounceSetSize)

    await sleep(2000)
    commit('ready')
  },
  methods: {
    setSize() {
      const { state, commit } = this.$store

      commit('setSize', {
        x: window.innerWidth,
        y: window.innerHeight,
      })
      this.$webgl.resize(state.resolution.x, state.resolution.y)
    },
  },
})
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(canvas);
}
</style>
