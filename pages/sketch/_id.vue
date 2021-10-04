<template lang="pug">
div
</template>

<script lang="ts">
import Vue from 'vue'
import { Page } from '@/@types/frontend'

export default Vue.extend({
  async asyncData({ app, params, $content }) {
    let page
  
    if (process.browser) {
      app.$webgl.hideSketch()
    }
    try {
      page = await $content(params.id).fetch()
    } catch {}  

    return {
      page,
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
  mounted() {
    this.$webgl.changeSketch(this.page.webgl)
  },
})
</script>

<style lang="scss" scoped></style>