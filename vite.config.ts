import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/pocket-ledger-ai/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'PocketLedger AI',
        short_name: 'PocketLedger',
        description: '100% Offline Personal Finance PWA with Dual-Engine AI and Active Learning',
        theme_color: '#c2652a',
        background_color: '#faf5ee',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,json}']
      }
    })
  ],
  worker: {
    format: 'es'
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
});
