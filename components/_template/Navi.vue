<template lang="pug">
.navi
  div
    nuxt-link(
      to = '/'
      )
      |Home
  div
    nuxt-link(
      to = '/sketch/newyear2022'
      )
      |New Year 2022
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.navi {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: z(console);
}
</style>