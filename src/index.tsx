// src/index.tsx  (или src/main.tsx — как у тебя указано в index.html)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ──────────────────────────────────────────────────────────────────────
// Типы для TypeScript — чтобы не ругался на window.Telegram
// ──────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: any;
        initData: string;
        version: string;
        themeParams: any;
        close: () => void;
        [key: string]: any;
      };
    };
  }
}

// ──────────────────────────────────────────────────────────────────────
// Надёжная инициализация Telegram WebApp (работает даже при задержке загрузки скрипта)
// ──────────────────────────────────────────────────────────────────────
const initTelegramWebApp = () => {
  const tryInit = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      console.log('Telegram WebApp инициализирован успешно');
      return true;
    }
    return false;
  };

  // Пробуем сразу
  if (tryInit()) return;

  // Если сразу не получилось — ждём максимум 3 секунды
  let attempts = 0;
  const interval = setInterval(() => {
    if (tryInit() || attempts >= 30) {
      clearInterval(interval);
    }
    attempts++;
  }, 100);
};

// Запускаем инициализацию
initTelegramWebApp();

// ──────────────────────────────────────────────────────────────────────
// Обычный рендер React-приложения
// ──────────────────────────────────────────────────────────────────────
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не найден элемент #root в index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);