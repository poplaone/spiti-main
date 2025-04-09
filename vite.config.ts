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
    // Additional optimizations for mobile performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3, // Additional optimization passes
        pure_getters: true, // Optimize getter functions
        unsafe: true, // Enable "unsafe" optimizations
        unsafe_arrows: true, // Optimize arrow functions
        unsafe_comps: true, // Optimize comparisons
        unsafe_math: true, // Optimize math expressions
        unsafe_methods: true, // Optimize method calls
      },
      mangle: {
        safari10: true, // Fix Safari 10 bugs
      },
      format: {
        comments: false, // Remove all comments
      },
      ecma: 2020, // Use modern features
      toplevel: true, // Mangle top-level functions and variables
    },
    // Create separate chunks for better caching and mobile loading
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
          // Create separate chunks for mobile optimization
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
          gallery: [
            'src/components/PhotoGallery.tsx',
            'src/components/gallery/GalleryImage.tsx',
            'src/hooks/useGalleryNavigation.ts',
          ],
          forms: [
            'src/components/LeadForm.tsx',
            'src/hooks/lead-form/index.ts',
            'src/hooks/lead-form/useFormState.ts',
            'src/hooks/lead-form/useFormSubmission.ts',
          ],
          // Create a separate chunk for critical header components
          header: [
            'src/components/Header.tsx',
            'src/components/header/DesktopMenu.tsx',
            'src/components/header/Logo.tsx',
            'src/components/header/MobileMenu.tsx',
          ],
          // Create a separate chunk for utilities
          utils: [
            'src/hooks/use-mobile.tsx',
            'src/utils/lazyLoading.ts',
            'src/utils/imageUtils.ts',
          ],
          // Admin chunk - still keeping separate but not eagerly loaded
          admin: {
            include: [
              'src/components/admin/**/*',
              'src/pages/admin/**/*',
              'src/hooks/admin/**/*',
            ],
            enforce: true, // Ensure admin code is always separate
          },
        },
        // Generate non-hashed chunk names for better debugging
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
}));
