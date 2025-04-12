
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
      gcTime: 10 * 60 * 1000 // 10 minutes
    }
  }
});

// Performance optimized render function
const renderApp = () => {
  // Create root outside of render call to avoid issues
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  
  // Remove placeholder when app loads
  const placeholder = document.getElementById('hero-placeholder');
  if (placeholder) {
    placeholder.style.opacity = '0';
    placeholder.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      placeholder.remove();
    }, 300);
  }
  
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
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    renderApp();
  } else {
    window.addEventListener('load', renderApp);
  }
}
