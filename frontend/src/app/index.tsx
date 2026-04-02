import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloAppProvider } from './providers/apolloProvider.tsx'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloAppProvider>
    <App />
    </ApolloAppProvider>
  </StrictMode>,
)
