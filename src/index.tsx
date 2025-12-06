
// src/index.tsx
// Версия: статический UI + безопасная инициализация Telegram WebApp (повторные попытки).
// НЕ выполняет React-рендеринг — только вставляет HTML/CSS в #root.

import './index.css';

/* ------------------------------------------------------------------------
   Типы для TypeScript (чтобы не ругался на window.Telegram)
   ------------------------------------------------------------------------ */
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: any;
        onEvent?: (name: string, payload: any) => void;
        [key: string]: any;
      };
    };
  }
}

/* ------------------------------------------------------------------------
   Простой дизайн (HTML), который вставляем в #root вместо React-рендера
   Модифицируй структуру/тексты/классы под ваш дизайн.
   ------------------------------------------------------------------------ */
function mountStaticUI() {
  const rootEl = document.getElementById('root');
  if (!rootEl) {
    console.error('Не найден #root в index.html');
    return;
  }

  rootEl.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <img src="/logo.png" alt="Logo" class="app-logo" />
        <div class="app-title-block">
          <h1 class="app-title">VSUWT Schedule</h1>
          <p class="app-subtitle">Мини-приложение расписания — тестовый дизайн</p>
        </div>
      </header>

      <main class="app-main">
        <div class="card">
          <h2 class="card-title">Добро пожаловать</h2>
          <p class="card-text">Приложение запущено в браузере. Это статическая страница — без React-рендера.</p>

          <div class="controls">
            <button id="open-webapp-btn" class="btn primary">Открыть мини-приложение</button>
            <button id="help-btn" class="btn">Помощь</button>
          </div>

          <div id="status" class="status">Статус: <span class="status-value">Ожидание инициализации Telegram...</span></div>
        </div>
      </main>

      <footer class="app-footer">
        <small>© VSUWT — Тестовое окружение</small>
      </footer>
    </div>
  `;

  // Привязки событий кнопок
  const statusEl = document.querySelector('.status-value') as HTMLElement | null;
  const openBtn = document.getElementById('open-webapp-btn') as HTMLButtonElement | null;
  const helpBtn = document.getElementById('help-btn') as HTMLButtonElement | null;

  openBtn?.addEventListener('click', () => {
    // В статическом режиме просто показываем сообщение — в реальном приложении здесь может быть переход
    if (window.Telegram?.WebApp) {
      // Если Telegram доступен — можно изменить поведение (например, вызвать tgWebApp.open)
      statusEl && (statusEl.textContent = 'Открытие WebApp (внутри Telegram)...');
      // пример: window.Telegram.WebApp.expand();
    } else {
      statusEl && (statusEl.textContent = 'Открытие в браузере: переход на URL мини-аппа');
      // если нужно — делаем редирект на рабочую страницу
      // window.location.href = 'https://vsuwt-schedule.vercel.app/';
    }
  });

  helpBtn?.addEventListener('click', () => {
    alert('Помощь: откройте мини-приложение через бота в Telegram или используйте тестовый режим в браузере.');
  });
}

/* ------------------------------------------------------------------------
   Безопасная инициализация Telegram WebApp — пробует несколько раз, как в первой версии
   Возвращает Promise, который резолвится когда WebApp найден (или тайм-аут).
   ------------------------------------------------------------------------ */
function initTelegramWebApp(params?: { debug?: boolean; attemptsLimit?: number; intervalMs?: number }): Promise<void> {
  const debug = params?.debug ?? false;
  const attemptsLimit = params?.attemptsLimit ?? 30;
  const intervalMs = params?.intervalMs ?? 100;

return new Promise<void>((resolve) => {
    const tryInit = (): boolean => {
      if (window.Telegram?.WebApp) {
        try {
          window.Telegram.WebApp.ready();
          window.Telegram.WebApp.expand?.();
          if (debug) console.log('Telegram WebApp инициализирован');
        } catch (e) {
          if (debug) console.warn('Ошибка при вызове WebApp API', e);
        }
        const statusEl = document.querySelector('.status-value') as HTMLElement | null;
        if (statusEl) statusEl.textContent = 'Telegram инициализирован — готово';
        resolve();
        return true;
      }
      return false;
    };

    if (tryInit()) return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryInit() || attempts >= attemptsLimit) {
        clearInterval(interval);
        if (attempts >= attemptsLimit) {
          if (debug) console.warn('Telegram WebApp не был найден за время ожидания');
          const statusEl = document.querySelector('.status-value') as HTMLElement | null;
          if (statusEl) statusEl.textContent = 'Telegram не обнаружен — работа в браузерном режиме';
          resolve();
        }
      }
    }, intervalMs);
  });
}

/* ------------------------------------------------------------------------
   Запуск: сначала монтируем статический UI (без React), затем запускаем init
   ------------------------------------------------------------------------ */
(function start() {
  mountStaticUI();                      // сразу показываем дизайн в #root
  // Запускаем инициализацию Telegram (не блокируем UI)
  initTelegramWebApp({ debug: true }).catch((err) => {
    console.error('Ошибка инициализации Telegram:', err);
    const statusEl = document.querySelector('.status-value') as HTMLElement | null;
    if (statusEl) statusEl.textContent = 'Ошибка инициализации Telegram';
  });
})();