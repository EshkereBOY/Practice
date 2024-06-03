import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import RegisterPage from './auth/registration/register.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RegisterPage/>
  </React.StrictMode>
)
