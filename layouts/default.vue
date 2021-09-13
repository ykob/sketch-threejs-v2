<template lang="pug">
div
  Nuxt
  canvas#canvas-webgl
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    resolution: {
      x: 0,
      y: 0,
    },
  }),
  mounted() {
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
</style>
