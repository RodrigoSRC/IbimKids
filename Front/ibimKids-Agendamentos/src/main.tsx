import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './providers/UserContext.js'
import { EscalasListProvider } from './providers/EscalasListContext.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

        <UserProvider>
          <EscalasListProvider>
            <App />  
          </EscalasListProvider>
        </UserProvider>

    </BrowserRouter>
  </React.StrictMode>,
)
