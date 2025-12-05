// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// САМАЯ НАДЁЖНАЯ ИНИЦИАЛИЗАЦИЯ — TypeScript не ругается
setTimeout(() => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }
}, 100);
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);