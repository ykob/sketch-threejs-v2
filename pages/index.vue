<template lang="pug">
div
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  transition: {
    name: 'page',
    duration: 1000,
    mode: '',
  },
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
    page: IContentDocument | null
  } => ({
    page: null,
  }),
  head() {
    return {
      titleTemplate: '',
    }
  },
  async mounted() {
    if (this.page === null) return
    await this.$webgl.changeSketch(this.page.webgl)
  },
})
</script>

<style lang="scss" scoped></style>