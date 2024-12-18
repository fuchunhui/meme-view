import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({mode}) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.NODE_ENV === 'production' ? '/meme-view/' : '/',
    plugins: [
      vue(),
      vueDevTools(),
    ],
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    define: {
      'NODE_ENV': JSON.stringify(env.NODE_ENV),
    }
  };
});
