<template>
  <component :is="tag">{{ headingText }}</component>
</template>

<script>
export default {
  name: "Heading",
  props: {
    headingText: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "h1",
    },
  },
};
</script>
