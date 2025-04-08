
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
      // Using swcReactRefresh options instead of swcOptions
      plugins: [
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
    // Add build configuration to handle lockfile-related issues
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Minimize output file sizes
    cssCodeSplit: true,
    sourcemap: false,
    // Optimize chunk distribution
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
    // Enable additional minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize preview
  preview: {
    port: 8080,
    host: true,
  }
}));
