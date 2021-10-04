<template lang="pug">
div
</template>

<script lang="ts">
import Vue from 'vue'
// import { IContentDocument } from '@nuxt/content/types/content'
import { Page } from '@/@types/frontend'

export default Vue.extend({
  async asyncData({ $content }) {
    const response = await $content('home').fetch()

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