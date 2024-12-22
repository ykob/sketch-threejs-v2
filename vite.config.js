import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        sample1: resolve(__dirname, 'src/sample1/index.ts'),
        sample2: resolve(__dirname, 'src/sample2/index.ts'),
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
