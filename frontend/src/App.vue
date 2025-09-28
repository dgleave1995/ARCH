<template>
  <div style="height: 100%;">
    <SideBar
      class="app-layout"
      :items="[
        { name: 'Dashboard', url: '/home' },
        { name: 'Analytics', url: '/analytics' },
        { name: 'Settings', url: '/create-content' }
      ]"
    />

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  components: {
    SideBar
  }
};
</script>

<style scoped>
.app-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px; /* sidebar width */
  height: 100vh;
}

.main-content {
  margin-left: 220px; /* push content past sidebar */
  padding: 1rem;
}
</style>
