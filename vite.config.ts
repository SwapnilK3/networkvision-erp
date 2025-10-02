import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
          apollo: ['@apollo/client', 'graphql'],
          charts: ['recharts']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@mui/material', 
      '@mui/icons-material', 
      '@mui/x-data-grid',
      '@apollo/client',
      'recharts',
      'papaparse',
      'date-fns'
    ]
  },
  esbuild: {
    target: 'es2020'
  }
})

