import {createApp} from 'vue';
import App from './App.vue';
import './assets/css/base.less';
import './assets/css/theme.less';
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');
