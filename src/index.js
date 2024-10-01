import React from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify'

import AppProvider from './hooks'
import Routes from './routes/routes'
import GlobalStyles from './styles/globalStyles'

const root = document.getElementById('root')
const reactRoot = createRoot(root)

reactRoot.render(
  <>
    <AppProvider>
      <Routes />
    </AppProvider>
    <ToastContainer theme="colored" autoClose="2000" />
    <GlobalStyles />
  </>
)

