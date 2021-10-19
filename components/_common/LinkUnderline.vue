<template lang="pug">
nuxt-link.link-underline(
  :to = 'to'
  )
  slot
  .link-underline__line
  .link-underline__line
  .link-underline__line
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.link-underline {
  display: inline-block;
  position: relative;
  &__line {
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: currentColor;
  }
}
</style>
