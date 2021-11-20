<template lang="pug">
.split-string-container
  div(
    :is = 'is'
    v-for = 'item, index in splittedValue'
    :key = 'keyPrefix + "-" + index'
    :typo = 'item'
    )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    keyPrefix: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    itemType: {
      type: String,
      default: 's',
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
