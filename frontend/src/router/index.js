import { createRouter, createWebHistory } from 'vue-router';
import PageRenderer from '../components/pages/PageRenderer.vue';

import Analytics from '../page-configs/Analytics.js';
import CreateContent from '../page-configs/CreateContent.js';
import Home from '../page-configs/Home.js';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: PageRenderer,
    props: { pageConfig: Home },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: PageRenderer,
    props: { pageConfig: Analytics },
  },
  {
    path: '/create-content',
    name: 'CreateContent',
    component: PageRenderer,
    props: { pageConfig: CreateContent },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
