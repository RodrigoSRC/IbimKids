import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './providers/UserContext.js'
import { EscalasListProvider } from './providers/EscalasListContext.js'
import { ProfessoresListProvider } from './providers/ProfessoresListContext.js'
import { AgendamentosListProvider } from './providers/AgendamentosListContext.js'
import { CustomProvider } from 'rsuite';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <CustomProvider theme="dark">
        <UserProvider>
          <EscalasListProvider>
            <ProfessoresListProvider>
              <AgendamentosListProvider>
                <App />  
              </AgendamentosListProvider>
            </ProfessoresListProvider>
          </EscalasListProvider>
        </UserProvider>
    </CustomProvider>


    </BrowserRouter>
  </React.StrictMode>,
)
