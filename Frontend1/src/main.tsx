import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <Auth0Provider
    domain="dev-za460nyv0ukr8y3k.us.auth0.com"
    clientId="sboNLOvtnNJ5NTuYUtpvkz3BDtQYqFAS"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
      <App />
    </Auth0Provider>
    </Provider>

    </BrowserRouter>
  </StrictMode>,
)
