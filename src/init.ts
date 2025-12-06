// init.ts — безопасная инициализация Telegram WebApp
export function initTelegramWebApp({
  debug = false,
  attemptsLimit = 30,
  intervalMs = 100,
} = {}): Promise<void> {
  return new Promise((resolve) => {
    const tryInit = (): boolean => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand?.();
        if (debug) console.log('✅ Telegram WebApp инициализирован');
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
        if (attempts >= attemptsLimit && debug) {
          console.warn('⚠ Telegram WebApp не инициализирован после максимального количества попыток');
        }
      }
    }, intervalMs);
  });
}