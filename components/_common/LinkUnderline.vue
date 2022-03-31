<template>
  <nuxt-link class="link-underline" :to="to">
    <span @mouseover="mouseOver" @mouseleave="mouseLeave">
      <slot />
    </span>
    <div
      v-for="(bool, index) in lines"
      :key="'link-underline-' + index"
      class="link-underline__line"
    >
      <transition>
        <div
          v-show="current === index &amp;&amp; isOvered === true"
          class="link-underline__line-in"
        ></div>
      </transition>
    </div>
  </nuxt-link>
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
    current: 0,
    lines: Array(MAX),
    isOvered: false,
  }),
  methods: {
    mouseLeave() {
      this.isOvered = false
      this.current = (this.current + 1) % MAX
    },
    mouseOver() {
      this.isOvered = true
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
      transition-timing-function: $easeOutCirc;
    }
    &.v-leave {
      transform: translate3d(0, 0, 0);
    }
    &.v-leave-to {
      transform: translate3d(101%, 0, 0);
      transition-duration: 0.4s;
      transition-timing-function: $easeOutCirc;
    }
  }
}
</style>
