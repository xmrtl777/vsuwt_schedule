// src/lib/init.ts
import {
  init as initSDK,
  miniApp,
  viewport,
  themeParams,
  backButton,
  initData,
} from '@tma.js/sdk-react';

// Самый простой и надёжный способ — просто инициализируем SDK
export function init(): void {
  // Включаем дебаг только в разработке
  if (import.meta.env.DEV) {
    console.log('Telegram Mini App: режим разработки');
  }

  // Инициализируем SDK — это заменяет Telegram.WebApp.ready() и expand()
  initSDK();

  // Монтируем всё нужное
  miniApp.mount();           // вместо expand()
  themeParams.mount();
  themeParams.bindCssVars(); // автоматически подставляет --tg-theme-* в CSS
  backButton.mount.ifAvailable();
  initData.restore();

  // Viewport — для правильной высоты и safe-area
  if (viewport.mount.isAvailable()) {
    viewport.mount().then(() => {
      viewport.bindCssVars(); // даёт --tg-viewport-height, --tg-safe-area-inset-top и т.д.
    });
  }
}