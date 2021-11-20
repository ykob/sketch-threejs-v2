<template lang="pug">
div
  transition(
    duration = '3000'
    )
    HomeSummary(
      v-show = 'isLoaded'
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
  computed: {
    isReady(): boolean {
      return this.$store.getters.isReady
    },
  },
  watch: {
    async isReady(v: boolean) {
      if (this.page === null) return
      if (v === true) {
        await this.$webgl.changeSketch(this.page.webgl)
        this.isLoaded = true
      }
    },
  },
  async mounted() {
    if (this.page === null) return
    if (this.isReady === true) {
      await this.$webgl.changeSketch(this.page.webgl)
      await sleep(1000)
      this.isLoaded = true
    }
  },
})
</script>

<style lang="scss" scoped></style>