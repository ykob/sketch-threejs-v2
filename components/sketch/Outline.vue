<template lang="pug">
.sketch-outline
  .sketch-outline__title(
    :style = 'stylesTitle'
    )
    |{{ title }}
  .sketch-outline__description
    |{{ description }}
  .sketch-outline__created-at
    |Created at : {{ createdAt }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    createdAt: {
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
.sketch-outline {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: z(console);
  line-height: 1;
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
  &__title {
    margin-bottom: 8px;
  }
  &__description {
    @include l-lg {
      margin-bottom: 8px;
      font-size: 18px;
    }
    @include l-md {
      margin-bottom: 8px;
      font-size: 16px;
    }
    @include l-sm {
      margin-bottom: 4px;
      font-size: 14px;
    }
  }
  &__created-at {
    @include l-lg {
      font-size: 16px;
    }
    @include l-md {
      font-size: 14px;
    }
    @include l-sm {
      font-size: 12px;
    }
  }
}
</style>