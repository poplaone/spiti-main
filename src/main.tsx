
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

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
