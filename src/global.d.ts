// src/global.d.ts
export {}; // делаем файл модулем, чтобы расширение global применялось корректно

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready?: () => void;
        expand?: () => void;
        initDataUnsafe?: any;
        setBackgroundColor?: (color: string) => void;
        setHeader?: (text: string) => void;
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}