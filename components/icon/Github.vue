<template>
  <IconBase :fill="fill" :size="size" icon-name="github">
    <path :d="d"></path>
  </IconBase>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiGithub } from '@mdi/js'

export default Vue.extend({
  props: {
    fill: {
      type: String,
      default: 'currentColor',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    d() {
      return mdiGithub
    },
  },
})
</script>
