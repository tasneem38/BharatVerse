import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  envDir: '../',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true,  // Allow external access
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok-free.dev',
      '.ngrok.io',
      'gertha-readjustable-unubiquitously.ngrok-free.dev'  // Your specific domain
    ]
  }
})
