<template>
  <div style="height: 100%;">
    <SideBar
      class="app-layout"
      :items="[
        { name: 'Dashboard', url: '/home' },
        { name: 'Analytics', url: '/analytics' },
        { name: 'Create Content', url: '/create-content' },
        { name: 'Notes', url: '/notes' },
      ]"
    />
    <router-view class="main-content" /> 
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>

<style scoped>
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.app-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: fit-content;  /* fixed sidebar width */
  height: 100vh;
}

.main-content {
  height: 100%;
  margin-left: 220px;
  padding: 1rem;
  text-align: left;
  display: block;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
