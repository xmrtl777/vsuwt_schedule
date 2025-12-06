import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ─────────────── Telegram WebApp Init ───────────────
const initTelegramWebApp = (): Promise<void> => {
  return new Promise((resolve) => {
    const tryInit = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
        window.Telegram.WebApp.setBackgroundColor?.('#0b0b0c')
        console.log('Telegram WebApp готов')
        return true
      }
      return false
    }

    if (tryInit()) return resolve()

    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (tryInit() || attempts >= 30) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })
}

// ─────────────── Рендер после инициализации ───────────────
initTelegramWebApp().then(() => {
  const rootEl = document.getElementById('root')
  if (!rootEl) throw new Error('#root не найден')

  ReactDOM.createRoot(rootEl).render(
    <App />
  )
})