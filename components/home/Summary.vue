<template lang="pug">
.home-summary
  .home-summary__text-row
    SplitStringContainer(
      value = 'Interactive sketches made with three.js.'
      )
  .home-summary__text-row
    SplitStringContainer(
      value = 'Created by Yoichi Kobayashi.'
      )
  .home-summary__links
    .home-summary__link
      ButtonRound(
        href = 'https://github.com/ykob/sketch-threejs-v2'
        target = '_blank'
        )
        IconGithub
    .home-summary__link
      ButtonRound(
        href = 'https://twitter.com/ykob0123'
        target = '_blank'
        )
        IconTwitter
    .home-summary__link
      ButtonRound(
        href = 'https://www.tplh.net/'
        target = '_blank'
        )
        IconFaceManProfile
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.home-summary {
  position: absolute;
  right: 0;
  left: 0;
  z-index: z(console);
  @include l-lg {
    bottom: 7.5%;
  }
  @include l-md {
    bottom: 7.5%;
  }
  @include l-sm {
    bottom: 40px;
  }
  &__text-row {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    letter-spacing: 0.15em;
    @include l-lg {
      font-size: 15px;
    }
    @include l-md {
      font-size: 14px;
    }
    @include l-sm {
      font-size: 13px;
    }
  }
  &__links {
    display: flex;
    justify-content: center;
    @include l-lg {
      margin-top: 16px;
    }
    @include l-md {
      margin-top: 12px;
    }
    @include l-sm {
      margin-top: 12px;
    }
  }
  &__link {
    margin-right: 4px;
    margin-left: 4px;
    .v-enter & {
      opacity: 0;
      transform: scale(0.7);
    }
    .v-enter-to &,
    .page-leave-to & {
      transition-duration: 0.8s;
      transition-delay: 0.3s;
      transition-timing-function: $easeOutCubic;
    }
    .v-enter-to & {
      opacity: 1;
      transform: scale(1);
    }
    .page-leave-to & {
      opacity: 0;
      transform: scale(0.7);
    }
  }
}
</style>