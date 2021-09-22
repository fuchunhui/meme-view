import {defineConfig, UserConfigExport} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: UserConfigExport = {
  base: process.env.NODE_ENV === 'production' ? '/meme-view/' : '/',
  plugins: [vue()]
};

const lib = {
  entry: path.resolve(__dirname, 'src/main.ts'),
  name: 'imeme',
  formats: ['es', 'cjs', 'umd', 'iife'],
  fileName: (format: string) => `imeme.${format}.js`
};

export default defineConfig(({mode}) => {
  if (mode === 'lib') {
    Object.assign(config.build?.lib, lib);
  }
  return config;
});
