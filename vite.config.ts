
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ConfigEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    server: {
      host: '0.0.0.0',
      port: 3000,
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
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
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
  };
});
