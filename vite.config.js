import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const path = await import('path').then(mod => mod.default);
const filename = fileURLToPath(import.meta.url);
const root = dirname(filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: '@vue/compat',
      "@": path.resolve(root, "./src"),
    },
  },
});
