<template>
  <Heading
    headingText="ARCH">
  </Heading>
  <div style="max-width: 600px; margin: 2rem auto; font-family: sans-serif;">
    <Heading
      headingText="Enter Your Content Here!"></Heading>

    <!-- Input Text Area -->
    <TextInput
      placeholder="Paste your content here..."
      rows="5"
      v-model="content"
    />

    <!-- Platform Checkboxes -->
    <div style="margin-bottom: 1rem;">
      <label v-for="p in allPlatforms" :key="p" style="margin-right: 1rem;">
        <input type="checkbox" :value="p" v-model="platforms" />
        {{ p }}
      </label>
    </div>

    <!-- Submit Button -->
    <button
      @click="repurposeContent"
      :disabled="loading || !content || platforms.length === 0"
      style="padding: 0.5rem 1rem;"
    >
      {{ loading ? "Repurposing..." : "Repurpose" }}
    </button>

    <!-- Output -->
    <div v-if="Array.isArray(response) && response.length" style="margin-top: 2rem;">
      <h2>Repurposed Outputs:</h2>
      <div
        v-for="(out, index) in response"
        :key="index"
        style="border: 1px solid #ccc; padding: 0.5rem; margin-bottom: 0.5rem;"
      >
        <strong>{{ platforms[index] }}:</strong>
        <p>{{ out }}</p>
        <button @click="copyToClipboard(out)">Copy</button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" style="color: red; margin-top: 1rem;">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "./api/client.js";
import Heading from "./components/Heading.vue"
import TextInput from "./components/TextInput.vue";

export default {

  components:{
    Heading,
    TextInput
  },

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
        console.log("Sending request to backend...", content.value, platforms.value);
        const res = await api.post("/repurpose", {
          content: content.value,
          platforms: platforms.value,
        });
        console.log("Backend response:", res.data);

        // safely assign response if backend returns array
        response.value = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        console.error(err);
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
