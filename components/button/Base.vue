<template>
  <div
    :is="tag"
    :class="classnames"
    :disabled="disabled"
    :style="styles"
    :to="to"
    class="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    buttonType: {
      type: String,
      default: 'common',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '44px',
    },
    radius: {
      type: String,
      default: '4px',
    },
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
  },
  computed: {
    classnames(): string[] {
      const classnames = [`${this.buttonType}`]
      if (this.disabled) {
        classnames.push('disabled')
      }
      return classnames
    },
    styles(): { [key: string]: string } {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius,
      }
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
  }
  &.transparent {
    font-weight: 600;
    text-decoration: none;
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
