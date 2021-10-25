<template lang="pug">
.split-string-container
  SplitStringItem(
    v-for = 'item, index in splittedValue'
    :key = 'keyPrefix + "-" + index'
    )
    |{{ item }}
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
  },
  computed: {
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
