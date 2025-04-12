
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
      // Remove the suspense property as it's not supported in the current version
    }
  }
});

// Performance optimized render function using two-phase hydration
const renderApp = () => {
  // Create root outside of render call to avoid issues
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  
  // Use concurrent mode for faster initial render
  const root = ReactDOM.createRoot(rootElement);
  
  // Wrap in a requestAnimationFrame to defer non-critical rendering work
  requestAnimationFrame(() => {
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
};

// Progressive hydration strategy
if (typeof window !== 'undefined') {
  // Check if the document is already interactive or complete
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Use requestIdleCallback for non-critical initialization if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(renderApp, { timeout: 1000 });
    } else {
      // Fallback to setTimeout with a short delay
      setTimeout(renderApp, 50);
    }
  } else {
    // Add event listener with passive option for better performance
    document.addEventListener('DOMContentLoaded', () => {
      // Slightly delay render to prioritize content painting
      setTimeout(renderApp, 50);
    }, { passive: true, once: true });
  }
}
