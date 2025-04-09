
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
    // Optimize build
    sourcemap: false, // Disable sourcemaps in production for smaller files
    minify: 'terser', // Use terser for better minification
    cssMinify: true, // Ensure CSS is minified
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query',
          ],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ],
          forms: [
            'react-hook-form',
            'zod',
            '@hookform/resolvers'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Add reportCompressedSize for production builds only
    reportCompressedSize: mode === 'production',
  },
}));
