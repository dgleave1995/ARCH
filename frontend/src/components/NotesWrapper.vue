<template>
  <div class="wrapper">
    <div class="notes-container">
      <Notes 
        v-for="note in notes" 
        :key="note.id" 
        :heading="note.heading" 
        :noteText="note.text"
        @update:heading="note.heading = $event"
        @update:noteText="note.text = $event"
      />
    </div>
    
    <div class="add-note-btn" @click="addNotes">+</div>
  </div>
</template>

<script>
import Notes from './Notes.vue';

export default {
  name: 'NotesWrapper',
  components: { Notes },
  data() {
    return {
      notes: []
    }
  },
  methods: {
    addNotes() {
      this.notes.push({
        id: Date.now(),
        heading: `Note ${this.notes.length + 1}`,
        text: ''
      });
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding: 1rem;
}

/* Container for horizontal flow */
.notes-container {
  display: flex;
  flex-wrap: wrap;         /* allows wrapping to new line */
  gap: 1rem;               /* spacing between notes */
}

/* Optional: adjust note width to make them flow nicely */
.notes-box,
.notes-overlay {
  flex: 0 0 200px;         /* fixed width for each note */
  min-width: 150px;        /* prevent getting too small */
}

/* Floating add button fixed to bottom-right of viewport */
.add-note-btn {
  position: fixed;        /* makes it float relative to the viewport */
  bottom: 20px;           /* distance from bottom */
  right: 20px;            /* distance from right */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #333;
  color: white;
  font-size: 2rem;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  z-index: 9999;          /* ensures it stays above other content */
}

</style>
