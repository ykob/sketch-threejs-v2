<template lang="pug">
div
</template>

<script lang="ts">
import Vue from 'vue'
import { Page } from '@/@types/frontend'

export default Vue.extend({
  async asyncData({ params, $content }) {
    const response = await $content(params.id).fetch()

    return {
      page: response,
    }
  },
  data: (): {
    page: Page
  } => ({
    page: {
      title: '',
      webgl: '',
    },
  }),
  created() {
    this.$webgl.changeSketch(this.page.webgl)
  },
})
</script>

<style lang="scss" scoped></style>