<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li 
          v-for="item in items" 
          :key="item.url"
        >
          <RouterLink 
            :to="item.url" 
            class="menu-link"
            active-class="active-link"
          >
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (arr) => arr.every(i => "name" in i && "url" in i)
  }
})
</script>

<style scoped>
.sidebar {
  width: fit-content;
  height: 100vh;
  background-color: #1e293b; /* dark slate */
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-link {
  display: block;
  padding: 0.75rem 1rem;
  color: #cbd5e1; /* light gray */
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background 0.2s, color 0.2s;
}

.menu-link:hover {
  background: #334155;
  color: #fff;
}

.active-link {
  background: #3b82f6; /* blue */
  color: #fff;
}
</style>
