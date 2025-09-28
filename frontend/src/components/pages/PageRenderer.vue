<template>
  <div>
    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <!-- Render heading dynamically -->
      <component :is="section.headingTag">{{ section.title }}</component>

      <div class="elements">
        <component
          v-for="(el, i) in section.elements"
          :key="`${sectionIndex}-${i}-${el.component}`"
          :is="getComponent(el.component)"
          v-bind="el.props"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw } from "vue";
import ComponentNotFound from "../ComponentNotFound.vue";

// Glob all components in the ../components folder
const components = import.meta.glob('../*.vue');

export default {
  props: {
    pageConfig: Object,
  },
  computed: {
    sections() {
      return this.pageConfig?.sections || [];
    },
  },
  data() {
    return {
      loadedComponents: {}, // Cache async components
    };
  },
  methods: {
    getComponent(name) {
      // Check cache first
      if (this.loadedComponents[name]) {
        return this.loadedComponents[name];
      }

      // Find the component key from glob
      const matchKey = Object.keys(components).find(key => key.endsWith(`${name}.vue`));

      if (!matchKey) {
        console.warn(`Component "${name}" not found!`);
        this.loadedComponents[name] = markRaw(ComponentNotFound);
      } else {
        this.loadedComponents[name] = markRaw(
          defineAsyncComponent({
            loader: components[matchKey],
            errorComponent: ComponentNotFound,
          })
        );
      }

      return this.loadedComponents[name];
    },
  },
};
</script>
