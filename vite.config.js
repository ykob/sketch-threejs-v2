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
  root: resolve(__dirname, 'src'),
  plugins: [
    handlebars({
      context(pagePath) {
        console.log(pagePath);
        return pageData[pagePath];
      },
    }),
  ],
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
  server: {
    host: true,
    port: 3000,
  },
});
