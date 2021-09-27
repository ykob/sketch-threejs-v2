<template lang="pug">
div
  .navi
    .navi__item(
      @click = 'changeSketch1'
      )
      |home
    .navi__item(
      @click = 'changeSketch2'
      )
      |dummy01
    .navi__item(
      @click = 'changeSketch3'
      )
      |dummy02
    .navi__item(
      @click = 'changeSketch4'
      )
      |dummy03
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const response = await $content('pages').fetch()
    return {
      page: response,
    }
  },
  data: (): {
    page: any
  } => ({
    page: null,
  }),
  created() {
    if (this.page === null) return 
    this.$webgl.changeSketch(this.page.dummy01.webgl)
  },
  methods: {
    changeSketch1() {
      if (this.page === null) return 
      this.$webgl.changeSketch(this.page.home.webgl)
    },
    changeSketch2() {
      if (this.page === null) return 
      this.$webgl.changeSketch(this.page.dummy01.webgl)
    },
    changeSketch3() {
      if (this.page === null) return 
      this.$webgl.changeSketch(this.page.dummy02.webgl)
    },
    changeSketch4() {
      if (this.page === null) return 
      this.$webgl.changeSketch(this.page.dummy03.webgl)
    },
  },
})
</script>

<style lang="scss" scoped>
.navi {
  color: white;
  position: absolute;
  z-index: 2;
  bottom: 20px;
  right: 20px;
  &__item {
    cursor: pointer;
  }
}
</style>