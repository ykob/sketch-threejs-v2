<template>
  <svg
    :aria-labelledby="iconName"
    :height="size"
    :width="size"
    role="presentation"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="fill">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    fill: {
      type: String,
      default: 'currentColor',
    },
    iconName: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
  },
})
</script>
