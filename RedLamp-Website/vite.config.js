import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/RedLamp-Website/',
  server: {
    port: 3000
  }
})
