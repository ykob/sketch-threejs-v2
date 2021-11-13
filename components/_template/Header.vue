<template lang="pug">
transition(
  name = 'header'
  duration = '2000'
  appear
  )
  .header(
    v-show = 'isShown'
    )
    .site-title
      LinkUnderline(
        to = '/'
        )
        |sketch of three.js v2
    .links
      .links__item
        ButtonRound(
          href = 'https://github.com/ykob/sketch-threejs-v2'
          target = '_blank'
          )
          IconGithub
      .links__item
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
  .header-enter & {
    opacity: 0;
  }
  .header-enter-to &,
  .header-leave-to & {
    transition-duration: 1s;
    transition-timing-function: $easeOutCubic;
  }
  .header-enter-to & {
    opacity: 1;
    transition-delay: 1s;
  }
  .header-leave-to & {
    opacity: 0;
  }
  a {
    text-decoration: none;
  }
}
.links {
  display: flex;
}
.links__item {
  .header-enter & {
    opacity: 0;
    transform: scale(0.7);
  }
  .header-enter-to &,
  .header-leave-to & {
    transition-duration: 0.8s;
    transition-timing-function: $easeOutCubic;
  }
  .header-enter-to & {
    opacity: 1;
    transform: scale(1);
    transition-delay: 1.1s;
  }
  .header-leave-to & {
    opacity: 0;
    transform: scale(0.7);
    transition-delay: 0.1s;
  }
}
</style>