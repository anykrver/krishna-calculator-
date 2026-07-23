import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/cars': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
      '/vehicle': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
      '/ev': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      }
    }
  }
})

