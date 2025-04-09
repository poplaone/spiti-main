
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
          ],
          // Add admin-specific chunks
          admin: [
            'src/components/admin/package-form/departure-dates/index.tsx',
            'src/components/admin/package-form/departure-dates/DepartureDateForm.tsx',
            'src/components/admin/package-form/departure-dates/DepartureDatesList.tsx',
            'src/hooks/admin/useTourPackages.tsx',
            'src/pages/admin/AdminDashboard.tsx',
            'src/pages/admin/AdminSettings.tsx',
            'src/services/tourService.ts',
          ],
          // Create a separate chunks for form-related components
          forms: [
            'src/components/LeadForm.tsx',
            'src/hooks/lead-form/index.ts',
            'src/hooks/lead-form/useFormState.ts',
            'src/hooks/lead-form/useFormSubmission.ts',
          ]
        },
        // Improve code splitting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Improve minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
  },
}));
