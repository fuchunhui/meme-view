import {createRouter, createWebHashHistory} from 'vue-router';
import {useGlobalStore} from '../stores/global';
import ImageWrap from '../pages/ImageWrap.vue';
import WarnCenter from '../pages/WarnCenter.vue';
import MaterialCenter from '../pages/MaterialCenter.vue';

const routes = [
  {
    path: '/',
    component: WarnCenter
  },
  {
    path: '/story/:mid?',
    component: ImageWrap
  },
  {
    path: '/story/edit/:mid?',
    component: ImageWrap
  },
  {
    path: '/center',
    component: MaterialCenter
  },
  {
    path: '/butter/:mid?',
    component: ImageWrap
  },
  {
    path: '/butter/edit/:mid?',
    component: ImageWrap
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeResolve(async to => {
  if (to.path) {
    const store = useGlobalStore();
    store.setPath(to.path);
  }
})

export default router;
