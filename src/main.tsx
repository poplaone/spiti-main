
import React, { lazy, Suspense } from 'react';
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
      gcTime: 10 * 60 * 1000 // 10 minutes
    }
  }
});

// Performance optimized render function
const renderApp = () => {
  // Create root outside of render call to avoid issues
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  const root = ReactDOM.createRoot(rootElement);

  // Render with error boundary
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToursProvider>
          <App />
        </ToursProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
};

// Use requestIdleCallback for non-critical initialization if available
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(renderApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(renderApp, 1);
}
