import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'express',
        'mongoose',
        'socket.io',
        // Add other server-side modules here
      ],
    },
  },
});
