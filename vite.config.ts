
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create optimized chunks based on imports
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('tanstack')) return 'vendor-tanstack';
            if (id.includes('radix-ui')) return 'vendor-radix';
            if (id.includes('lucide')) return 'vendor-icons';
            return 'vendor';
          }
          
          // App code chunks
          if (id.includes('/src/components/ui/')) return 'ui';
          if (id.includes('/src/components/hero/')) return 'home-hero';
          if (id.includes('/src/components/tour/')) return 'tours';
          if (id.includes('/src/components/gallery/')) return 'gallery';
          if (id.includes('/src/components/form/')) return 'forms';
          if (id.includes('/src/components/header/')) return 'header';
          if (id.includes('/src/utils/') || id.includes('/src/lib/')) return 'utils';
        }
      }
    }
  }
}));
