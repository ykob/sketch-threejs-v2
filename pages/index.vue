<template>
  <div>
    <transition duration="3000">
      <HomeSummary v-show="isLoaded" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import { sleep } from '@ykob/js-util'

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
    } catch {
      return error({ message: 'Article not found' })
    }

    return {
      page,
    }
  },
  data: (): {
    isLoaded: boolean
    page: IContentDocument | null
  } => ({
    isLoaded: false,
    page: null,
  }),
  head() {
    const title = this.page ? `${process.env.sitename}` : ''
    const description = this.page ? this.page.description : ''
    const ogImage = this.page
      ? `${process.env.domain}${this.$router.options.base}${this.page.ogImage}`
      : ''
    const ogUrl = this.page
      ? `${process.env.domain}${this.$router.options.base}`
      : ''

    return {
      titleTemplate: '',
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
          content: 'website',
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
      if (this.page === null) {
        return
      }
      if (v === true) {
        await this.$webgl.changeSketch(this.page.webgl)
        this.isLoaded = true
      }
    },
  },
  async mounted() {
    if (this.page === null) {
      return
    }
    if (this.isReady === true) {
      await this.$webgl.changeSketch(this.page.webgl)
      await sleep(1500)
      this.isLoaded = true
    }
  },
})
</script>

<style lang="scss" scoped></style>
