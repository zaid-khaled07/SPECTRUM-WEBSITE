import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { ContentProvider } from './context/ContentContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ContentProvider>
        <App />
      </ContentProvider>
    </MotionConfig>
  </StrictMode>,
)
