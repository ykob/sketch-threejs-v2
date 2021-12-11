<template lang="pug">
ButtonBase.button(
  v-bind = '$attrs'
  tag = 'a'
  buttonType = 'transparent'
  width = '32px'
  height = '32px'
  radius = '50%'
  )
  slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
