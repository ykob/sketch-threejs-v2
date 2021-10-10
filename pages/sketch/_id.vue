<template lang="pug">
div
  SketchTitle(
    :title = 'page.title'
    )
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
  async asyncData({ error, params, store, $content }) {
    let page

    try {
      await store.dispatch('getPages')
      page = await $content(`sketch/${params.id}`).fetch()
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
  async mounted() {
    if (this.page === null) return
    await this.$webgl.changeSketch(this.page.webgl)
  },
})
</script>

<style lang="scss" scoped></style>