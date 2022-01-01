<template lang="pug">
div
  transition(
    duration = '3000'
    )
    SketchOutline(
      v-show = 'isLoaded'
      :title = 'page.title'
      :description = 'page.description'
      :createdAt = 'page.createdAt'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import { sleep } from '@/assets/js/utils'

export default Vue.extend({
  transition: {
    name: 'page',
    duration: 2000,
    mode: '',
  },
  async asyncData({ error, params, store, $content }) {
    let page

    try {
      await store.dispatch('getPages')
      page = await $content(`sketch/${params.id}`).fetch()
    } catch {
      return error({ message: 'Article not found' })
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
    const title = this.page ? `${this.page.title} - ${process.env.sitename}` : ''
    const description = this.page ? this.page.description : ''
    const ogImage = this.page ? `${process.env.domain}${this.$router.options.base}${this.page.ogImage}` : ''
    const ogUrl = this.page ? `${process.env.domain}${this.$router.options.base}sketch/${this.$route.params.id}/` : ''

    return {
      title: this.page ? this.page.title: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@ykob0123',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogImage,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: ogUrl,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogImage,
        },
      ],
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
    if (this.isReady) {
      await this.$webgl.changeSketch(this.page.webgl)
      await sleep(1000)
      this.isLoaded = true
    }
  },
})
</script>

<style lang="scss" scoped></style>