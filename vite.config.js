import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const pageData = [
  {
    key: 'home',
    path: '/index.html',
    title: 'Sketch of three.js v2',
  },
  {
    key: 'bubble',
    path: '/bubble/index.html',
    title: 'Bubble',
  },
];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pageData.map((page) => [
          page.key,
          resolve(__dirname, `src${page.path}`),
        ]),
      ),
      output: {
        dir: resolve(__dirname, 'dist'),
      },
    },
    modulePreload: false,
    copyPublicDir: true,
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData.find((page) => page.path === pagePath);
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
