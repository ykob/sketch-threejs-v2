<template>
  <ButtonBase
    v-bind="$attrs"
    button-type="transparent"
    class="button"
    height="32px"
    radius="50%"
    tag="a"
    width="32px"
  >
    <slot />
  </ButtonBase>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
