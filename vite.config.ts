
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
      // Optimize React for production
      jsxImportSource: mode === "production" ? undefined : "@emotion/react",
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
    include: ['embla-carousel'],
    force: true, // Force dependencies optimization to resolve lockfile issues
  },
  build: {
    // Add build configuration to handle lockfile-related issues
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Additional optimizations for mobile performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Additional optimization passes
      },
      output: {
        comments: false, // Remove comments to reduce file size
      }
    },
    // Optimize chunk strategy
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
          ],
          router: [
            'react-router-dom',
          ],
          query: [
            '@tanstack/react-query',
          ],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ],
          // Add admin-specific chunks - kept separate for code splitting
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
          ],
          // Add smaller chunks for mobile optimization
          home: [
            'src/components/HeroCarousel.tsx',
            'src/components/hero/CarouselImages.tsx',
            'src/components/hero/CarouselImage.tsx',
          ],
          tours: [
            'src/components/TourPackages.tsx',
            'src/components/tour/TourPackageGrid.tsx',
            'src/components/tour/TourPackageHeader.tsx',
          ],
          // Create a chunk for image-related components
          images: [
            'src/components/PhotoGallery.tsx',
            'src/components/gallery/GalleryImage.tsx',
            'src/hooks/useGalleryNavigation.ts',
          ]
        },
        // Improve code splitting with deterministic names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1200,
    cssCodeSplit: true, // Split CSS into per-component chunks
    assetsInlineLimit: 4096, // Inline small files to reduce HTTP requests
    sourcemap: false, // Disable sourcemaps in production for smaller files
  },
  css: {
    // Optimize CSS
    postcss: {
      plugins: [
        // Import postcss plugins directly instead of using require
        // This fixes the dynamic require issue
      ],
    },
  },
}));
