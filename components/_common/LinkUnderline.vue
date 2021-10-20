<template lang="pug">
nuxt-link.link-underline(
  :to = 'to'
  )
  span(
    @mouseover = 'mouseOver'
    @mouseleave = 'mouseLeave'
    )
    slot
  .link-underline__line(
    v-for = 'bool, index in lines'
    )
    transition
      .link-underline__line-in(
        v-show = 'current === index && isOvered === true'
        )
</template>

<script lang="ts">
import Vue from 'vue'

const MAX = 3

export default Vue.extend({
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    current: -1,
    isOvered: false,
    lines: Array(MAX),
  }),
  methods: {
    mouseOver() {
      this.isOvered = true
    },
    mouseLeave() {
      this.isOvered = false
      this.current = (this.current + 1) % MAX
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
    display: block;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 0;
    pointer-events: none;
  }
  &__line-in {
    width: 100%;
    height: 100%;
    background-color: currentColor;
    &.v-enter {
      transform: translate3d(-101%, 0, 0);
    }
    &.v-enter-to {
      transform: translate3d(0, 0, 0);
      transition-duration: 0.4s;
    }
    &.v-leave {
      transform: translate3d(0, 0, 0);
    }
    &.v-leave-to {
      transform: translate3d(101%, 0, 0);
      transition-duration: 0.4s;
    }
  }
}
</style>
