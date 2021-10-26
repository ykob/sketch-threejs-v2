<template lang="pug">
transition
  .split-string-item(
    :style = 'styles'
    :class = 'classnames'
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
    classnames(): string[] {
      return [
        `rotate-enter-${Math.ceil(Math.random() * 7)}`,
        `rotate-leave-${Math.ceil(Math.random() * 7)}`,
      ]
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
  transition-property: none;
  .v-enter & {
    opacity: 0;
    @for $i from 1 through 7 {
      &.rotate-enter-#{$i} {
        $x: math.div($i, 7) * 1.6 - 0.8;
        transform: translate3d(0, 0.3em, 0) rotate3d(#{$x}, 1, 0, 45deg);
      }
    }
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
    transition-timing-function: $easeInCubic;
    @for $i from 1 through 7 {
      &.rotate-leave-#{$i} {
        $x: math.div($i, 7) * 1.6 - 0.8;
        transform: translate3d(0, -0.7em, 0) rotate3d(#{$x}, 1, 0, -75deg);
      }
    }
  }
}
</style>
