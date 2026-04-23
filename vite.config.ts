import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost'
  },
  base: '/dwarakas-restaurent/',
  build: {
    chunkSizeWarningLimit: 900,
    outDir: 'dist',
    emptyOutDir: true
  }
});
