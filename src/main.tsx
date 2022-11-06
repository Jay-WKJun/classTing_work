import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorBoundary as ErrorFallbackComponent } from '@/pages/ErrorBoundary';

import App from './App';
import './index.css';
import { GlobalStateProvider } from './store/GlobalContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 24,
      cacheTime: 1000 * 60 * 24,
      useErrorBoundary: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
          <Router>
            <App />
          </Router>
        </GlobalStateProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
