
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configure QueryClient with better performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

// Use createRoot with concurrent features enabled
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToursProvider>
        <App />
      </ToursProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
