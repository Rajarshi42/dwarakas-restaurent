import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost'
  },
  base: process.env.NODE_ENV === 'production' ? '/dwarakas-restaurent/' : '/',
  build: {
    chunkSizeWarningLimit: 900
  }
});
