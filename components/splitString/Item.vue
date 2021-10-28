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
        `rotate-enter-${Math.ceil(Math.random() * 20)}`,
        `rotate-leave-${Math.ceil(Math.random() * 20)}`,
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
    @for $i from 1 through 20 {
      &.rotate-enter-#{$i} {
        $x: (random() * 0.2 + 0.2) * ((random(3) - 1) * 2 - 1);
        $y: (random() * 0.3 + 0.7) * ((random(3) - 1) * 2 - 1);
        transform: translate3d(0, 0.3em, 0) rotate3d(#{$x}, #{$y}, 0, 45deg);
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
    @for $i from 1 through 20 {
      &.rotate-leave-#{$i} {
        $x: (random() * 0.2 + 0.2) * ((random(3) - 1) * 2 - 1);
        $y: (random() * 0.3 + 0.7) * ((random(3) - 1) * 2 - 1);
        transform: translate3d(0, -0.7em, 0) rotate3d(#{$x}, #{$y}, 0, -75deg);
      }
    }
  }
}
</style>
