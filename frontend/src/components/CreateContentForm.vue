<template>
  <div class="create-content-form">
    <!-- Headings -->
    <Heading headingText="ARCH" />
    <Heading headingText="Enter Your Content Here!" />

    <!-- Input Text Area -->
    <TextInput
      placeholder="Paste your content here..."
      rows="5"
      v-model="content"
    />

    <!-- Platform Checkboxes -->
    <div class="platform-selector">
      <label v-for="p in allPlatforms" :key="p">
        <input type="checkbox" :value="p" v-model="platforms" />
        {{ p }}
      </label>
    </div>

    <!-- Submit Button -->
    <button
      @click="repurposeContent"
      :disabled="loading || !content || platforms.length === 0"
    >
      {{ loading ? "Repurposing..." : "Repurpose" }}
    </button>

    <!-- Output -->
    <div v-if="response.length">
      <h2>Repurposed Outputs:</h2>
      <div v-for="(out, index) in response" :key="index">
        <strong>{{ platforms[index] }}:</strong>
        <p>{{ out }}</p>
        <button @click="copyToClipboard(out)">Copy</button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api/client.js"; // adjust path if needed
import Heading from "../components/Heading.vue";
import TextInput from "../components/TextInput.vue";

export default {
  name: "CreateContentForm",
  components: { Heading, TextInput },
  setup() {
    const content = ref("");
    const platforms = ref([]);
    const allPlatforms = ["Twitter", "LinkedIn", "Instagram"];
    const response = ref([]);
    const error = ref("");
    const loading = ref(false);

    const repurposeContent = async () => {
      loading.value = true;
      error.value = "";
      response.value = [];

      try {
        const res = await api.post("/repurpose", {
          content: content.value,
          platforms: platforms.value,
        });
        response.value = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        error.value = "Error connecting to backend";
      } finally {
        loading.value = false;
      }
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
      });
    };

    return {
      content,
      platforms,
      allPlatforms,
      response,
      error,
      loading,
      repurposeContent,
      copyToClipboard,
    };
  },
};
</script>

<style scoped>
.create-content-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.platform-selector label {
  margin-right: 1rem;
}

button {
  margin-top: 1rem;
}
</style>
