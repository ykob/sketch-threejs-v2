<template lang="pug">
.sketch-outline
  .sketch-outline__title(
    :style = 'stylesTitle'
    )
    SplitStringContainer(
      :value = 'title'
      )
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
      const x = Math.max(Math.min(state.resolution.x / 12, 104), 48)
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
    .v-enter & {
      opacity: 0;
      transform: translate3d(0, 8px, 0);
    }
    .v-enter-to &,
    .page-leave-to & {
      transition-duration: 0.8s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
    .v-enter-to & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-delay: 0.5s;
    }
    .page-leave & {
      opacity: 1;
    }
    .page-leave-to & {
      opacity: 0;
      transform: translate3d(0, -8px, 0);
      transition-delay: 0.1s;
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
    .v-enter & {
      opacity: 0;
      transform: translate3d(0, 8px, 0);
    }
    .v-enter-to &,
    .page-leave-to & {
      transition-duration: 0.8s;
      transition-timing-function: $easeOutCubic;
      transition-property: opacity, transform;
    }
    .v-enter-to & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-delay: 0.6s;
    }
    .page-leave & {
      opacity: 1;
    }
    .page-leave-to & {
      opacity: 0;
      transform: translate3d(0, -8px, 0);
      transition-delay: 0.2s;
    }
  }
}
</style>