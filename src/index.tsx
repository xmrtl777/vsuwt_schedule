// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if ((window as any).Telegram?.WebApp) {
  (window as any).Telegram.WebApp.ready()
  (window as any).Telegram.WebApp.expand()
}
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)