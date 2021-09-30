<template lang="pug">
.button(
  :is = 'tag'
  :to = 'to'
  :style = 'styles'
  :class = 'classnames'
  :disabled = 'disabled'
  @click = '$emit("click", $event)'
  )
  slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '44px',
    },
    buttonType: {
      type: String,
      default: 'common',
    },
    radius: {
      type: String,
      default: '4px',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles(): { [key: string]: string } {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius,
      }
    },
    classnames(): string[] {
      const classnames = [`${this.buttonType}`]
      if (this.disabled) {
        classnames.push('disabled')
      }
      return classnames
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  text-decoration: none;
  transition-duration: 0.4s;
  &:active {
    transition-duration: 0.1s;
  }
  &.common {
    box-shadow: 0 1px 1px rgba(#000, 0.3);
    font-weight: 600;
    text-decoration: none;
    transition-property: background-color;
  }
  &:disabled,
  &.disabled {
    filter: none;
    pointer-events: none;
    border: 0;
    color: map-get($colors, grayA5);
    background-color: map-get($colors, grayE5);
  }
}
</style>
