import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/scss/app.scss', 'resources/js/app.js'],
      refresh: true,
    }),
    vue(),
    // ziggy(), // ❌ Supprimé car le package n'existe pas
  ],
  resolve: {
    alias: {
      //  '@': path.resolve(__dirname, 'resources/js'),
      '@shared': path.resolve(__dirname, 'resources/shared'),
      '@front': path.resolve(__dirname, 'resources/front'),
      '@constants': path.resolve('resources/shared/constants'),
      '@blogs': path.resolve(__dirname, 'resources/blogs'),
      '@assets': path.resolve('resources/assets'),
      '@admin': path.resolve('resources/admin'),
    },
  },
});
