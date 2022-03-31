<template>
  <div class="split-string-container">
    <div
      :is="is"
      v-for="(item, index) in splittedValue"
      :key="keyPrefix + '-' + index"
      :typo="item"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    itemType: {
      type: String,
      default: 's',
    },
    keyPrefix: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    is(): string {
      switch (this.itemType) {
        case 'l':
          return 'SplitStringItemL'
        case 's':
        default:
          return 'SplitStringItemS'
      }
    },
    splittedValue(): string[] {
      return this.value.split('')
    },
  },
})
</script>

<style lang="scss" scoped>
.split-string-container {
  display: flex;
  perspective: 500px;
}
</style>
