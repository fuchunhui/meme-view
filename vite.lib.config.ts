import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    copy({
      targets: [
        {src: 'lib/index.html', dest: 'dist'}
      ],
      hook: 'writeBundle'
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'imeme',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format: string) => `imeme.${format}.js`
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'process.env': process.env
  }
});
