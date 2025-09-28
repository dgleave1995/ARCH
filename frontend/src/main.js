import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);  // create the Vue app instance

app.use(router);             // install the router
app.mount('#app');           // mount once
