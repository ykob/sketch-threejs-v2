import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        sample1: resolve(__dirname, 'src/sample1/index.html'),
        sample2: resolve(__dirname, 'src/sample2/index.html'),
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
