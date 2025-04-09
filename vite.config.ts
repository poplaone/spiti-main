
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'embla-carousel': path.resolve(__dirname, 'node_modules/embla-carousel'),
    },
  },
  optimizeDeps: {
    include: ['embla-carousel'],
    force: true
  },
  build: {
    minify: 'terser', // Properly typed now
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
          ],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@/components/ui'],
          home: ['@/components/hero', '@/components/TourPackages'],
          tours: ['@/components/tour'],
          gallery: ['@/components/gallery'],
          forms: ['@/components/form'],
          header: ['@/components/header'],
          utils: ['@/utils', '@/lib']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  }
});
