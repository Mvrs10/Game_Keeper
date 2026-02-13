import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import { AuthorizationProvider } from './context/AuthorizationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthorizationProvider>
        <App />
      </AuthorizationProvider>
    </BrowserRouter>
  </StrictMode>,
)
