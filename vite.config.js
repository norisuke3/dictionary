import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// for unplugin-icons, recommended by BootstrapVueNext since BootstrapVueNext doesn't support icons
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import {BootstrapVueNextResolver} from 'bootstrap-vue-next';
import IconsResolve from 'unplugin-icons/resolver';


const path = await import('path').then(mod => mod.default);
const filename = fileURLToPath(import.meta.url);
const root = dirname(filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver(), IconsResolve()]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
});
