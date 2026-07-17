import { useTranslation } from "./auto-il8n";
import { AutoI18nProvider } from "./auto-il8n";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from '@vuer-ai/react-helmet-async';
import { AlertProvider } from './contexts/AlertContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from './App.jsx';
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer, createRoot(document.getElementById('root')).render(<StrictMode>
   <HelmetProvider>
      <BrowserRouter>
       <AlertProvider>
        <LoaderProvider>
          <AuthProvider>
             <AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><AutoI18nProvider><App /></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider></AutoI18nProvider>
          </AuthProvider>
        </LoaderProvider>
       </AlertProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>);