import {createRouter, createWebHistory} from 'vue-router';

const Home = {template: '<div>Home</div>'};

import ImageWrap from '../pages/ImageWrap.vue';

const routes = [
  {
    path: '/',
    component: ImageWrap
  },
  {
    path: '/about',
    component: Home
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
