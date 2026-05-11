/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My AWS Projects App',
        short_name: 'AWSApp',
        description: 'Сложное приложение на AWS Amplify',
        theme_color: '#007bff',
        icons: [
          {
            src: 'https://flaticon.com', // Временная иконка (GitHub)
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
