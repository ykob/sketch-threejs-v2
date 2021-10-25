<template lang="pug">
div
  transition(
    duration = '3000'
    )
    SketchOutline(
      v-if = 'isLoaded'
      :title = 'page.title'
      :description = 'page.description'
      :createdAt = 'page.createdAt'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  transition: {
    name: 'page',
    duration: 2000,
    mode: '',
  },
  async asyncData({ params, store, $content }) {
    let page

    try {
      await store.dispatch('getPages')
      page = await $content(`sketch/${params.id}`).fetch()
    } catch {
    }

    return {
      page,
    }
  },
  data: (): {
    page: IContentDocument | null
    isLoaded: boolean
  } => ({
    page: null,
    isLoaded: false,
  }),
  async mounted() {
    if (this.page === null) return
    await this.$webgl.changeSketch(this.page.webgl)
    this.isLoaded = true
  },
})
</script>

<style lang="scss" scoped></style>