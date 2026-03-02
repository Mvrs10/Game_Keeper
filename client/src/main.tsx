import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ApolloProvider } from '@apollo/client/react';

import client from './apollo/client.ts';
import './index.css';
import App from './App.tsx';
import { AuthorizationProvider } from './context/AuthorizationContext.tsx';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthorizationProvider>
          <App />
        </AuthorizationProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
