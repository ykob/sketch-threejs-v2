<template lang="pug">
div
  Nuxt
  canvas#canvas-webgl
  .navi
    div
      nuxt-link(
        to = '/'
        )
        |Home
    div
      nuxt-link(
        to = '/sketch/dummy01'
        )
        |dummy01
    div
      nuxt-link(
        to = '/sketch/dummy02'
        )
        |dummy02
    div
      nuxt-link(
        to = '/sketch/dummy03'
        )
        |dummy03
</template>

<script lang="ts">
import Vue from 'vue'
import Colors from '@/assets/css/exports-colors.scss'

export default Vue.extend({
  data: () => ({
    resolution: {
      x: 0,
      y: 0,
    },
  }),
  mounted() {
    console.log(Colors)
    let timer: number = 0

    const debounceResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        this.resize()
      }, 200)
    }
  
    this.$webgl.start()
    this.resize()

    window.addEventListener('resize', debounceResize)
    window.addEventListener('deviceorientation', debounceResize)
  },
  methods: {
    resize() {
      this.resolution.x = window.innerWidth
      this.resolution.y = window.innerHeight
      this.$webgl.resize(this.resolution.x, this.resolution.y)
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
.navi {
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: z(console);
}
</style>
