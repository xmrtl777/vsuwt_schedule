// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// 100 % рабочая инициализация Telegram WebApp (даже при задержке загрузки)
const initTelegram = () => {
  const tg = (window as any).Telegram?.WebApp

  if (tg) {
    tg.ready()
    tg.expand()
    console.log('Telegram WebApp готов!')
    return
  }

  // Если скрипт Telegram ещё не загрузился — ждём до 3 секунд
  let attempts = 0
  const timer = setInterval(() => {
    const tgNow = (window as any).Telegram?.WebApp
    if (tgNow) {
      tgNow.ready()
      tgNow.expand()
      console.log('Telegram WebApp готов (с небольшой задержкой)')
      clearInterval(timer)
    }
    attempts++
    if (attempts > 30) clearInterval(timer) // остановим через 3 сек
  }, 100)
}

// Запускаем инициализацию
initTelegram()
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

// Обычный рендер React (ничего не меняем)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)