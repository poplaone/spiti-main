
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client with optimized settings for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce stale time for mobile to save memory
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Increase cache time to improve performance
      gcTime: 1000 * 60 * 15, // 15 minutes
      // Reduce refetch frequency on mobile
      refetchOnWindowFocus: false,
      // Disable refetch on reconnect for mobile (saves data)
      refetchOnReconnect: false,
      // Retry less on mobile
      retry: 1,
    },
  },
});

// Use createRoot without StrictMode in production for better performance
ReactDOM.createRoot(document.getElementById('root')!).render(
  import.meta.env.DEV ? (
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
  ),
);
