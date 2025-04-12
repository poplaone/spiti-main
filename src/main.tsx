
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      gcTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

// Use requestIdleCallback for non-critical initialization
const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  
  const root = ReactDOM.createRoot(rootElement);
  
  // Remove hero placeholder after hydration
  const placeholder = document.getElementById('hero-placeholder');
  if (placeholder) {
    placeholder.style.opacity = '0';
    placeholder.style.transition = 'opacity 0.3s ease';
    setTimeout(() => placeholder.remove(), 300);
  }
  
  // Render without StrictMode in production for better performance
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
};

// Execute immediately without waiting for idle callback
init();
