
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Optimize query client settings for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      gcTime: 15 * 60 * 1000, // 15 minutes
      networkMode: 'offlineFirst' // Prioritize cached data first
    }
  }
});

// Use an IIFE for immediate execution without waiting for idle callback
(function() {
  // Create root outside of render call to avoid issues
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  const root = ReactDOM.createRoot(rootElement);

  // Render with Error Boundary and without StrictMode in production
  // StrictMode causes double rendering which impacts performance metrics
  root.render(
    process.env.NODE_ENV === 'development' ? (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ToursProvider>
            <App />
          </ToursProvider>
        </QueryClientProvider>
      </React.StrictMode>
    ) : (
      <QueryClientProvider client={queryClient}>
        <ToursProvider>
          <App />
        </ToursProvider>
      </QueryClientProvider>
    )
  );
})();
