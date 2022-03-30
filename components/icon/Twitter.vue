<template>
  <IconBase :fill="fill" :size="size" icon-name="twitter">
    <path :d="d"></path>
  </IconBase>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiTwitter } from '@mdi/js'

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
      return mdiTwitter
    },
  },
})
</script>
