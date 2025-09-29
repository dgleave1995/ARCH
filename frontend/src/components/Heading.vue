<template>
  <component class="heading-format" :is="tag">{{ headingText }}</component>
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

<style scoped>
.heading-format {
  text-align: left;
  margin: 0 0 1rem 0; /* optional spacing */
  width: 100%;        /* ensures full width for flow layout */
}

</style>
