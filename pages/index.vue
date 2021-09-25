<template lang="pug">
div
  .navi
    .navi__item(
      @click = 'changeSketch'
      )
      |change sketch
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
    this.$webgl.changeSketch(this.page.home.webgl)
  },
  methods: {
    changeSketch() {
      if (this.page === null) return 
      this.$webgl.changeSketch(this.page.home.webgl)
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