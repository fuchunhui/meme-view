import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import './assets/css/base.less';
import './assets/css/theme.less';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
