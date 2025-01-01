import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    title: 'Sketch of three.js v2',
  },
  '/bubble/index.html': {
    title: 'Bubble',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/index.html'),
        bubble: resolve(__dirname, 'src/bubble/index.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
    modulePreload: false,
    copyPublicDir: true,
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  root: resolve(__dirname, 'src'),
  server: {
    host: true,
    port: 3000,
  },
});
