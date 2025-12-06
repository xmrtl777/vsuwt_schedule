// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Глобальные типы для window.Telegram
/**
 * waitForTelegram — ждем появления window.Telegram.WebApp
 * если не найдено за (attemptsLimit * intervalMs) — резолвим и рендерим в "браузерном" режиме
 */
function waitForTelegram(attemptsLimit = 30, intervalMs = 100, debug = true): Promise<void> {
  return new Promise((resolve) => {
    const tryInit = (): boolean => {
      if (window.Telegram?.WebApp) {
        try {
          window.Telegram.WebApp.ready?.();
          window.Telegram.WebApp.expand?.();
          if (debug) console.log('Telegram WebApp initialized');
        } catch (err) {
          if (debug) console.warn('tg init call failed', err);
        }
        resolve();
        return true;
      }
      return false;
    };

    if (tryInit()) return;

    let attempts = 0;
    const id = setInterval(() => {
      attempts++;
      if (tryInit() || attempts >= attemptsLimit) {
        clearInterval(id);
        if (attempts >= attemptsLimit && debug) {
          console.warn('Telegram WebApp not found — continuing in browser mode');
        }
        // resolve уже мог быть вызван в tryInit; но на всякий — resolve() здесь:
        resolve();
      }
    }, intervalMs);
  });
}

// Глобальные обработчики ошибок — выводим в консоль и в DOM при фатале
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error ?? event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

async function start() {
  await waitForTelegram(30, 100, true);

  try {
    const root = document.getElementById('root');
    if (!root) throw new Error('#root not found');
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err: any) {
    console.error('Render error', err);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `<div style="background:#2b0b0b;color:#ffd2d2;padding:16px;border-radius:10px;max-width:900px;margin:24px">
        <strong>Ошибка рендера:</strong>
        <pre style="white-space:pre-wrap">${(err && err.stack) ? err.stack : String(err)}</pre>
      </div>`;
    }
  }
}

start().catch((e) => console.error('start failed', e));