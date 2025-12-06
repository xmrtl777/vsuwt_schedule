import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initTelegramWebApp } from './init';

// ────────────────────────────────────────────────
// Типы для TypeScript (чтобы не ругался на window.Telegram)
// ────────────────────────────────────────────────
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

// ────────────────────────────────────────────────
// Инициализация WebApp и рендер приложения
// ────────────────────────────────────────────────
async function startApp() {
  await initTelegramWebApp({ debug: true });

  const rootEl = document.getElementById('root');
  if (!rootEl) {
    throw new Error('❌ Root element #root не найден');
  }

  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Запускаем
startApp().catch((err) => {
  console.error('Ошибка запуска приложения:', err);
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="background:#2b0b0b;color:#ffd2d2;padding:16px;border-radius:10px;max-width:800px">
        <strong>Ошибка запуска:</strong>
        <pre style="white-space:pre-wrap">${err.stack || String(err)}</pre>
      </div>
    `;
  }
});