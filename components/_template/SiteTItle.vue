<template lang="pug">
.site-title
  nuxt-link(
    to = '/'
    )
    |sketch of three.js v2
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.site-title {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: z(console);
}
</style>