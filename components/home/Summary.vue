<template lang="pug">
.home-summary
  .home-summary__text
    .home-summary__text-row
      SplitStringContainer(
        value = 'Interactive sketches made with three.js.'
        )
    .home-summary__text-row
      SplitStringContainer(
        value = 'Created by yoichi kobayashi.'
        )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.home-summary {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: z(console);
  @include l-lg {
    margin-bottom: 2.5%;
  }
  @include l-md {
    margin-bottom: 24px;
  }
  @include l-sm {
    margin-bottom: 24px;
  }
  &__text {
    font-size: 16px;
    letter-spacing: 0.15em;
  }
  &__text-row {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
}
</style>