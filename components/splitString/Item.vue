<template lang="pug">
transition
  .split-string-item(
    :style = 'styles'
    )
    slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    delayMax: {
      type: Number,
      default: 0.32,
    },
  },
  data: () => ({
    delay: 0,
  }),
  computed: {
    styles(): { [key: string]: string } {
      return {
        transitionDelay: `${this.delay}s`,
      }
    },
  },
  mounted() {
    this.delay = Math.random() * this.delayMax
  },
})
</script>

<style lang="scss" scoped>
.split-string-item {
  display: inline-block;
  .v-enter & {
    opacity: 0;
    transform: translate3d(0, 0.5em, 0) rotate3d(0.4, 1, 0, 45deg);
  }
  .v-enter-to &,
  .page-leave-to & {
    transition-duration: 0.8s;
    transition-property: opacity, transform;
  }
  .v-enter-to & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition-timing-function: $easeOutCubic;
  }
  .page-leave & {
    opacity: 1;
  }
  .page-leave-to & {
    opacity: 0;
    transform: translate3d(0, -0.5em, 0) rotate3d(0.4, 1, 0, -45deg);
    transition-timing-function: $easeInCubic;
  }
}
</style>
