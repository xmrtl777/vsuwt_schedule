// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ──────────────────────────────────────────────────────────────
// Типы для TypeScript (чтобы не ругался на window.Telegram)
// ──────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: any;
        [key: string]: any;
      };
    };
  }
}

// ──────────────────────────────────────────────────────────────
// Функция инициализации Telegram WebApp
// (оставляем на всякий случай — вдруг потом пригодится)
// ──────────────────────────────────────────────────────────────
const initTelegramWebApp = () => {
  const tryInit = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      console.log('Telegram WebApp инициализирован');
      return true;
    }
    return false;
  };

  if (tryInit()) return;

  let attempts = 0;
  const interval = setInterval(() => {
    if (tryInit() || attempts >= 30) clearInterval(interval);
    attempts++;
  }, 100);
};

// Пока тестируем чистый HTML — ВСЁ НИЖЕ ЗАКММЕНТИРОВАНО
// Раскомментируешь только после того, как простой тест в Telegram заработает!

/*
initTelegramWebApp();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Не найден #root в index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// ВСЁ, ЧТО НИЖЕ — ЗАКММЕНТИРОВАНО! 
// Сборка пройдёт, Vercel загрузит простой index.html из корня
// и мы увидим, работает ли Telegram вообще
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←