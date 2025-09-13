import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'ATLAS Agro Industrial',
        short_name: 'ATLAS Agro',
        description: 'Sitio web corporativo de ATLAS Agro Industrial',
        theme_color: '#ffffff',
        background_color: '#ffffff',
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
      }
    }),
    compression({
      algorithm: 'gzip',
      threshold: 1024
    }),
    compression({
      algorithm: 'brotliCompress',
      threshold: 1024
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      port: 5173
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['@reduxjs/toolkit', 'react-redux'],
          query: ['@tanstack/react-query'],
          utils: ['axios', 'clsx', 'tailwind-merge']
        }
      }
    }
  }
})

