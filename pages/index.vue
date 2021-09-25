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
    console.log(response)
  },
  created() {
    this.$webgl.changeSketch()
  },
  methods: {
    changeSketch() {
      this.$webgl.changeSketch()
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