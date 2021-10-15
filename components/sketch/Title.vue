<template lang="pug">
.sketch-title(
  :style = 'stylesTitle'
  )
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
  computed: {
    stylesTitle(): { [key: string]: string } {
      const { state } = this.$store
      const x = Math.max(Math.min(state.resolution.x / 12, 90), 48)
      return {
        fontSize: `${x}px`,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.sketch-title {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: z(console);
  display: flex;
  justify-content: center;
  @include l-lg {
    margin-bottom: 2.5%;
    margin-left: 2.5%;
  }
  @include l-md {
    margin-bottom: 24px;
    margin-left: 24px;
  }
  @include l-sm {
    margin-bottom: 24px;
    margin-left: 24px;
  }
  .page-enter & {
    opacity: 0;
  }
  .page-enter-to & {
    opacity: 1;
    transition-duration: 1s;
  }
  .page-leave & {
    opacity: 1;
  }
  .page-leave-to & {
    opacity: 0;
    transition-duration: 1s;
  }
}
</style>