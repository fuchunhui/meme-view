import {createRouter, createWebHistory} from 'vue-router';
import {useGlobalStore} from '../stores/global';
import ImageWrap from '../pages/ImageWrap.vue';
import MaterialCenter from '../pages/MaterialCenter.vue';

const routes = [
  {
    path: '/image',
    component: ImageWrap
  },
  {
    path: '/image/edit',
    component: ImageWrap
  },
  {
    path: '/center',
    component: MaterialCenter
  },
  {
    path: '/butter',
    component: ImageWrap
  },
  {
    path: '/butter/edit',
    component: ImageWrap
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeResolve(async to => {
  if (to.path) {
    const store = useGlobalStore();
    store.setPath(to.path);
  }
})

export default router;
