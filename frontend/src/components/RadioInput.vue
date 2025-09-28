<template>
    <div class="radio-spacing">
      <label v-for="p in allPlatforms" :key="p" style="margin-right: 1rem;">
        <input type="checkbox" :value="p" v-model="platforms" />
        {{ p }}
      </label>
    </div>
</template>

<script>
export default {
  name: 'RadioInput',
  props: {
    allPlatforms: {
      type: Array,
      required: true,
    },
  }
}
</script>

<style scoped>
    .radio-spacing{
        margin-bottom: 1rem
    }
</style>