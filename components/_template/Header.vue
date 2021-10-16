<template lang="pug">
transition(
  name = 'header'
  duration = '1000'
  appear
  )
  .header(
    v-show = 'isShown'
    )
    .site-title
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
  .header-enter & {
    opacity: 0;
  }
  .header-enter-to & {
    opacity: 1;
    transition-duration: 1s;
  }
  .header-leave-to & {
    opacity: 0;
    transition-duration: 1s;
  }
}
</style>