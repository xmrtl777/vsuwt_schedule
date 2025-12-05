// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Типы для Telegram
declare global {
  interface Window {
    Telegram?: { WebApp?: any };
  }
}

// Надёжная инициализация Telegram
const initTelegram = () => {
  const tryInit = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      return true;
    }
    return false;
  };

  if (tryInit()) return;

  let attempts = 0;
  const interval = setInterval(() => {
    if (tryInit() || attempts++ > 30) clearInterval(interval);
  }, 100);
};

initTelegram();

// Рендер React — теперь безопасно
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}