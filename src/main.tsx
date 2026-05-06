import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeDatabase } from './db'
import './index.css'

// Initialize database and run migrations
initializeDatabase().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})