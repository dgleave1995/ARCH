<template>
  <div>
    <Notes 
      v-for="note in notes" 
      :key="note.id" 
      :heading="note.heading" 
      :noteText="note.text"
      @update:heading="note.heading = $event"
      @update:noteText="note.text = $event"
    />
    
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
.add-note-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #333;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
</style>
