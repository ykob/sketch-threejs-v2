<template lang="pug">
div
  |Error
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    this.$webgl.hideSketch()
  }
})
</script>

<style lang="scss" scoped></style>
