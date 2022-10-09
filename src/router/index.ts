import {createRouter, createWebHistory} from 'vue-router';

import ImageWrap from '../pages/ImageWrap.vue';
import MaterialCenter from '../pages/MaterialCenter.vue';

const routes = [
  {
    path: '/',
    component: ImageWrap
  },
  {
    path: '/center',
    component: MaterialCenter
  },
  {
    path: '/edit',
    component: ImageWrap
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
