<template lang="pug">
.sketch-title
  |{{ title }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.sketch-title {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 24px;
  z-index: z(console);
  display: flex;
  justify-content: center;
  font-size: 32px;
}
</style>