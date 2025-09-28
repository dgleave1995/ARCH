<template>
  <button
    :disabled="isDisabled"
    @click="handleClick"
    class="custom-button"
  >
    {{ loading ? loadingText : text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: { type: String, required: true },
    actionProp: { type: String, required: false },   // method name to call
    disabledProp: { type: String, required: false }, // boolean state from parent
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: "Loading..." },
    state: { type: Object, default: () => ({}) }, // parent state object
  },
  computed: {
    isDisabled() {
      if (!this.disabledProp) return false;
      return !!this.state[this.disabledProp];
    },
  },
  methods: {
    handleClick() {
      if (this.actionProp && this.state[this.actionProp] && typeof this.state[this.actionProp] === "function") {
        this.state[this.actionProp]();
      }
    },
  },
};
</script>

<style scoped>
.custom-button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-button:hover:not(:disabled) {
  background-color: #1c6cd9;
}

.custom-button:disabled {
  background-color: #a0c4ff;
  cursor: not-allowed;
}
</style>
