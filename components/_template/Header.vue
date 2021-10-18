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
    .buttons
      ButtonRound(
        href = 'https://github.com/ykob/sketch-threejs-v2'
        target = '_blank'
        )
        IconGithub
      ButtonRound(
        href = 'https://twitter.com/ykob0123'
        target = '_blank'
        )
        IconTwitter
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
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(console);
  @include l-lg {
    margin-top: 2.5%;
    margin-left: 2.5%;
  }
  @include l-md {
    margin-top: 24px;
    margin-left: 24px;
  }
  @include l-sm {
    margin-top: 24px;
    margin-left: 24px;
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
.site-title {
  margin-bottom: 4px;
  @include l-lg {
    font-size: 20px;
  }
  @include l-md {
    font-size: 18px;
  }
  @include l-sm {
    font-size: 16px;
  }
  a {
    text-decoration: none;
  }
}
.buttons {
  display: flex;
}
</style>