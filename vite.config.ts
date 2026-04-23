import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost'
  },
  base: '/dwarakas-restaurant/',
  build: {
    chunkSizeWarningLimit: 900
  }
});
