import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), svelte()],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src'),
      '@components': resolve(projectRootDir, 'src/components'),
      '@pages': resolve(projectRootDir, 'src/pages'),
      '@layouts': resolve(projectRootDir, 'src/layouts'),
    },
  },
});
