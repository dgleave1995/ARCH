<template>
  <div v-if="response.length">
    <h2>Repurposed Outputs:</h2>
    <div v-for="(out, index) in response" :key="index">
      <strong>{{ platforms[index] }}:</strong>
      <p>{{ out }}</p>
      <button @click="copyToClipboard(out)">Copy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepurposedOutput",
  props: {
    response: {
      type: Array,
      required: true,
    },
    platforms: {
      type: Array,
      required: true,
    },
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
      });
    },
  },
};
</script>
