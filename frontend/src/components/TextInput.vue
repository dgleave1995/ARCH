<template>
  <textarea
    :value="modelValue"
    class="textFormat"
    :placeholder="placeholder"
    :rows="rows"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    rows: {
      type: String,
      default: '5'
    }
  }
}
</script>

<style scoped>
.textFormat {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
</style>
