import { resolve } from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import handlebars from 'vite-plugin-handlebars';
import { pageData } from './src/consts/';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [
    glsl(),
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
  server: {
    host: true,
    port: 3000,
  },
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
  },
});
