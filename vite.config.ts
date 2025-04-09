
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "embla-carousel": path.resolve(__dirname, "./node_modules/embla-carousel"),
    },
  },
  optimizeDeps: {
    include: ['embla-carousel'],
    force: true,
  },
  build: {
    // Improved minification and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    // Improved chunking strategy
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom'
          ],
          router: [
            'react-router-dom'
          ],
          query: [
            '@tanstack/react-query'
          ],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
}));
