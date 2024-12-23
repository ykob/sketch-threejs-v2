import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
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
