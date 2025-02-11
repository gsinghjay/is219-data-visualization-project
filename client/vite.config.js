import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/data'
    }
  },
  // Allow importing JSON and CSV files
  assetsInclude: ['**/*.csv'],
  json: {
    stringify: true
  }
})
