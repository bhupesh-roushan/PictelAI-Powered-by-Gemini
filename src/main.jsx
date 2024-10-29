import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContexProvider from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <ContexProvider>
    <App />
  </ContexProvider>,
)
