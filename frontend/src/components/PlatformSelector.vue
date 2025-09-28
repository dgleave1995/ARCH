<template>
  <div>
    <label v-for="p in platforms" :key="p">
      <input type="checkbox" :value="p" v-model="selectedPlatforms" />
      {{ p }}
    </label>
  </div>
</template>

<script>
export default {
  name: "PlatformSelector",
  props: {
    platforms: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  computed: {
    selectedPlatforms: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
