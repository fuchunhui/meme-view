import {defineConfig, UserConfigExport, LibraryOptions} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: UserConfigExport = {
  base: process.env.NODE_ENV === 'production' ? '/meme-view/' : '/',
  plugins: [vue()]
};

const lib: LibraryOptions = {
  entry: path.resolve(__dirname, 'lib/index.ts'),
  name: 'imeme',
  formats: ['es', 'cjs', 'umd', 'iife'],
  fileName: (format: string) => `imeme.${format}.js`
};

export default defineConfig(({mode}) => {
  if (mode === 'lib') {
    config.build = {
      lib
    };
  }
  return config;
});
