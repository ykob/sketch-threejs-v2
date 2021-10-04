<template lang="pug">
div
</template>

<script lang="ts">
import Vue from 'vue'
import { Page } from '@/@types/frontend'

export default Vue.extend({
  async asyncData({ error, $content }) {
    let page

    try {
      page = await $content('home').fetch()
    } catch(result) {
      error(result.response)
    }

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
  created() {
    this.$webgl.changeSketch(this.page.webgl)
  },
})
</script>

<style lang="scss" scoped></style>