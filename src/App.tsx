// src/App.tsx
import React, { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import './App.css';

export default function App() {
  const { tg, ready } = useTelegram();

  useEffect(() => {
    if (!ready) {
      console.log('Telegram not ready — running in browser mode');
      return;
    }

    // безопасно: tg доступен и готов
    try {
      tg.setBackgroundColor?.('#ffffff');
      // пример: можно установить заголовок, если SDK поддерживает
      if (tg.setHeader) tg.setHeader('VSUWT Schedule');
    } catch (err) {
      console.warn('Error calling tg methods', err);
    }
  }, [tg, ready]);

  return (
    <div className="app">
      <header className="app-header">
        <img src="/vswt_logo.png" alt="logo" className="logo" />
        <h1>VSUWT Schedule</h1>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Добро пожаловать</h2>
          <p>
            Приложение {ready ? 'запущено внутри Telegram' : 'работает в браузере (mock-режим)'}.
          </p>
          <div className="controls">
            <button
              className="btn primary"
              onClick={() => {
                if (tg) {
                  // здесь можно вызвать методы tg, если нужно
                  tg.expand?.();
                } else {
                  window.open('https://vsuwt-schedule.vercel.app', '_blank');
                }
              }}
            >
              Открыть мини-приложение
            </button>
          </div>
        </section>
      </main>

      <footer className="app-footer">© VSUWT</footer>
    </div>
  );
}