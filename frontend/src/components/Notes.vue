<template>
  <div>
    <!-- Minimized state -->
    <div 
      v-if="!isOpen" 
      class="notes-box" 
      @click="toggleNotes"
    >
      <h4>{{ heading }}</h4>
    </div>

    <!-- Maximized state -->
    <div 
      v-else 
      class="notes-overlay"
    >
      <div class="notes-header" @click="toggleNotes">
        <h4>{{ heading }} (click to minimize)</h4>
      </div>
      <div class="heading-editor">
          <label>Update Heading:</label>
          <input v-model="heading" placeholder="Enter new heading" />
        </div>
      <div class="notes-content">
        <TextInput
          v-model="noteText"
          placeholder="Please Enter Your Notes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';

export default {
  name: 'Notes',
  components: { TextInput },
  props: {
    noteItem: {
      type: String,
      required: false,
      default: ''
    },
    initialHeading: {
      type: String,
      required: false,
      default: 'Notes'
    }
  },
  data() {
    return {
      isOpen: false,
      noteText: this.noteItem,
      heading: this.initialHeading
    }
  },
  methods: {
    toggleNotes() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style scoped>
/* Minimized box */
.notes-box {
  position: relative;       /* was fixed before */
  margin: 0;                /* remove bottom/right offsets */
  background: #1e293b;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
  flex: 0 0 200px;          /* makes flex layout work */
  min-width: 150px;
}

.notes-overlay {
  position: absolute;       /* relative to parent wrapper for maximized note */
  top: 0;
  left: 0;
  width: 60%;
  height: 60%;
  z-index: 1000;
  background: #1e293b;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}


.notes-header {
  padding: 1rem;
  background: #333;
  color: white;
  cursor: pointer;
}

.notes-content {
  flex: 1;
  padding: 1rem;
}

.heading-editor {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.heading-editor input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
