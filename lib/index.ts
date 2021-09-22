import {createApp, ComponentPublicInstance} from 'vue';
import App from '../src/App.vue';
import '../src/assets/css/base.less';
import '../src/assets/css/theme.less';
import {setDomain} from '../src/config';

const load = (container: string | Element, domain: string): ComponentPublicInstance => {
  setDomain(domain || import.meta.env.VITE_APP_DOMAIN);
  return createApp(App).mount(container);
};

export default {
  load
};
