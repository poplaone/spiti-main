
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToursProvider } from './context/ToursContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client with optimized settings for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      gcTime: 10 * 60 * 1000, // 10 minutes
      suspense: false // Disable suspense for better initial load
    }
  }
});

// Performance optimized render function with priority hints
const renderApp = () => {
  // Create root outside of render call to avoid issues
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  
  const root = ReactDOM.createRoot(rootElement);
  
  // Use unstable_batchedUpdates for better performance (reduces renders)
  // @ts-ignore - React internal API
  if (React.unstable_batchedUpdates) {
    // @ts-ignore - React internal API
    React.unstable_batchedUpdates(() => {
      root.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <ToursProvider>
              <App />
            </ToursProvider>
          </QueryClientProvider>
        </React.StrictMode>,
      );
    });
  } else {
    // Fallback to standard render
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ToursProvider>
            <App />
          </ToursProvider>
        </QueryClientProvider>
      </React.StrictMode>,
    );
  }
};

// Use requestIdleCallback for non-critical initialization if available
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // If already interactive or complete, render immediately
    renderApp();
  } else {
    // Add event listener with passive option for better performance
    window.addEventListener('DOMContentLoaded', renderApp, { passive: true });
  }
}
