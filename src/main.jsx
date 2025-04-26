import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './context/WalletContext' 
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <ThemeProvider> 
      <WalletProvider>
        <App />
      </WalletProvider>
    </ThemeProvider>
  </StrictMode>,
)