import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets and scripts
  build: {
    outDir: 'dist', // Folder wyjściowy
    sourcemap: true, // Przydatne do debugowania
  },
})
