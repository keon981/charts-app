import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { QueryProvider } from './serve'

import 'efai-ui-component/style.css'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
)
