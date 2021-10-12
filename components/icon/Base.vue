<template lang="pug">
svg(
  xmlns="http://www.w3.org/2000/svg"
  :width = 'size'
  :height = 'size'
  viewBox = '0 0 24 24'
  :aria-labelledby = 'iconName'
  role = 'presentation'
  )
  title(
    :id = 'iconName'
    lang = 'en'
    )
    |{{ iconName }} icon
  g(
    :fill = 'fill'
    )
    slot
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
}
</script>
