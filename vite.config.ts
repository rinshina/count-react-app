import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/count-react-app/', //  Ensures correct paths for GitHub Pages
});
