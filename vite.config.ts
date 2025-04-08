
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
    react({
      // Using a more stable configuration for the SWC plugin
      plugins: mode === 'production' ? [] : [
        ['@swc/plugin-emotion', {}]
      ]
    }),
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
    include: [
      'embla-carousel', 
      'lucide-react', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-toast'
    ],
    force: true, // Force dependencies optimization to resolve lockfile issues
  },
  build: {
    // Optimize build for stability over optimization
    minify: mode === 'production' ? 'esbuild' : false, // Use esbuild instead of terser for better stability
    cssCodeSplit: true,
    sourcemap: false,
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
          icons: [
            'lucide-react'
          ],
          carousel: [
            'embla-carousel',
            'embla-carousel-react',
            'embla-carousel-autoplay'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  // Optimize preview
  preview: {
    port: 8080,
    host: true,
  }
}));
