<template lang="pug">
transition(
  name = 'site-title'
  )
  .site-title(
    v-show = 'isShown'
    )
    nuxt-link(
      to = '/'
      )
      |sketch of three.js v2
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    isShown(): boolean {
      return this.$route.path !== '/'
    },
  },
})
</script>

<style lang="scss" scoped>
.site-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(console);
  @include l-lg {
    margin-top: 2.5%;
    margin-left: 2.5%;
    font-size: 18px;
  }
  @include l-md {
    margin-top: 24px;
    margin-left: 24px;
    font-size: 16px;
  }
  @include l-sm {
    margin-top: 24px;
    margin-left: 24px;
    font-size: 14px;
  }
  &.site-title-enter {
    opacity: 0;
  }
  &.site-title-enter-to {
    opacity: 1;
    transition-duration: 1s;
  }
  &.site-title-leave-to {
    opacity: 0;
    transition-duration: 1s;
  }
}
</style>