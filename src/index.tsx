// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// динамически импортируем логгер только в dev
if (import.meta.env.DEV) {
  import('./debug/debugLogger').then((m) => {
    // attachDOMLogger возвращает функцию отключения, но пока не используем её
    m.attachDOMLogger()
  }).catch((err) => {
    console.warn('Failed to load debug logger', err)
  })
}

// Типы для Telegram
declare global {
  interface Window {
    Telegram?: { WebApp?: any }
  }
}

// Инициализация Telegram (без блокировки рендера)
function initTelegramSafe(timeoutMs = 3000) {
  const tryInit = () => {
    try {
      const tg = window.Telegram?.WebApp
      if (tg && typeof tg.ready === 'function') {
        try {
          tg.ready()
          if (typeof tg.expand === 'function') tg.expand()
          if (typeof tg.setBackgroundColor === 'function') tg.setBackgroundColor('#0b0b0c')
        } catch (e) {
          console.warn('Telegram WebApp methods error', e)
        }
        console.info('Telegram WebApp initialized')
        return true
      }
    } catch (e) {
      console.warn('initTelegramSafe tryInit error', e)
    }
    return false
  }

  if (tryInit()) return

  const start = Date.now()
  const iv = setInterval(() => {
    if (tryInit() || Date.now() - start > timeoutMs) {
      clearInterval(iv)
      if (!window.Telegram?.WebApp) {
        console.info('Telegram WebApp not detected after timeout')
      }
    }
  }, 100)
}

initTelegramSafe(4000)

// Рендер React
const root = document.getElementById('root')
if (!root) throw new Error('#root not found')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)