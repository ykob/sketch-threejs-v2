<template lang="pug">
div
  Nuxt
  canvas#canvas-webgl
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    this.$webgl.start()
    this.$webgl.resize(100, 100)
  },
})
</script>
