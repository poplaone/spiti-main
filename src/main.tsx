
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 60 * 60 * 1000, // 1 hour (previously cacheTime)
      retry: 1, // Reduce retries on mobile
    }
  }
});

// Dynamically detect if we're on a low-end device
const isLowEndDevice = () => {
  // Check for device memory API
  if ('deviceMemory' in navigator) {
    return (navigator as any).deviceMemory < 4;
  }
  
  // Fallback: check for mobile device
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Wait for the DOM to be ready and create root only once
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create root outside of render call to avoid issues
const root = createRoot(rootElement);

// Determine if we should disable strict mode on low-end devices
const shouldUseStrictMode = !isLowEndDevice();

// Render with or without strict mode based on device capabilities
if (shouldUseStrictMode) {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToursProvider>
          <App />
        </ToursProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  // Skip strict mode on low-end devices for better performance
  root.render(
    <QueryClientProvider client={queryClient}>
      <ToursProvider>
        <App />
      </ToursProvider>
    </QueryClientProvider>
  );
}
