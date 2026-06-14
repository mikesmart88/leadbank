import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { HelmetProvider } from '@vuer-ai/react-helmet-async'
import { AlertProvider } from './contexts/AlertContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HelmetProvider>
      <BrowserRouter>
       <AlertProvider>
        <LoaderProvider>
          <AuthProvider>
             <App />
          </AuthProvider>
        </LoaderProvider>
       </AlertProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
