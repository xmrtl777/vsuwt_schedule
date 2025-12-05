// src/main.tsx (или index.tsx — как у тебя называется)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { init } from './init';  // ← твой исправленный файл

// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
// ИНИЦИАЛИЗАЦИЯ TELEGRAM — ТОЛЬКО ОДНА СТРОКА!
init();
// ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

// Больше никаких Telegram.WebApp.ready(), expand(), window.Telegram и т.д.

// Обычный рендер React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);