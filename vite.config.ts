
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
      // Add explicit alias for embla-carousel to resolve peer dependency issue
      "embla-carousel": path.resolve(__dirname, "./node_modules/embla-carousel"),
    },
  },
  optimizeDeps: {
    include: ['embla-carousel'],
    force: true, // Force dependencies optimization to resolve lockfile issues
  },
  build: {
    // Add build configuration to handle lockfile-related issues
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
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
}));
