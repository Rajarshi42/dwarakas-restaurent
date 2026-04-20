import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost'
  },
  base: '/',
  build: {
    chunkSizeWarningLimit: 900
  }
});
