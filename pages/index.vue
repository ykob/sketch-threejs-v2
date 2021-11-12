<template lang="pug">
div
  transition(
    duration = '3000'
    )
    HomeSummary(
      v-if = 'isLoaded'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import { sleep } from '@/assets/js/utils'

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
    isLoaded: boolean
  } => ({
    page: null,
    isLoaded: false,
  }),
  head() {
    return {
      titleTemplate: '',
    }
  },
  async mounted() {
    if (this.page === null) return
    await this.$webgl.changeSketch(this.page.webgl)
    await sleep(1000)
    this.isLoaded = true
  },
})
</script>

<style lang="scss" scoped></style>