// init.ts
export const initTelegramWebApp = (): void => {
  const webApp = window.Telegram?.WebApp;
  if (webApp) {
    webApp.ready?.();       // optional chaining на случай отсутствия метода
    webApp.expand?.();
    webApp.setBackgroundColor?.('#0b0b0c');
    webApp.setHeaderColor?.('#0b0b0c');
    console.log('Telegram WebApp initialized');
  } else {
    console.warn('Telegram WebApp not available yet');
  }
};