<template lang="pug">
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

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.navi {
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: z(console);
}
</style>