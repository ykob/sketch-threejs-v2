<template lang="pug">
IconBase(
  iconName = 'face-man-profile'
  :size = 'size'
  :fill = 'fill'
  )
  path(
    :d = 'd'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiFaceManProfile } from '@mdi/js'

export default Vue.extend({
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    d() {
      return mdiFaceManProfile
    },
  },
})
</script>
