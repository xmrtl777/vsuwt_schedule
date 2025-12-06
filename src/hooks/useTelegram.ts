// src/hooks/useTelegram.ts
import { useEffect, useMemo, useState } from 'react';

export function useTelegram(pollInterval = 100, attemptsLimit = 30) {
  const [tg, setTg] = useState<any>(() => (typeof window !== 'undefined' ? window.Telegram?.WebApp ?? null : null));
  const [ready, setReady] = useState<boolean>(() => !!(typeof window !== 'undefined' && window.Telegram?.WebApp));

  useEffect(() => {
    if (ready) return;

    let attempts = 0;
    const id = setInterval(() => {
      attempts++;
      const current = window.Telegram?.WebApp ?? null;
      if (current) {
        try {
          current.ready?.();
          current.expand?.();
        } catch (err) {
          console.warn('telegram calls failed', err);
        }
        setTg(current);
        setReady(true);
        clearInterval(id);
      } else if (attempts >= attemptsLimit) {
        clearInterval(id);
        setTg(null);
        setReady(false);
      }
    }, pollInterval);

    return () => clearInterval(id);
  }, [pollInterval, attemptsLimit, ready]);

  return useMemo(() => ({ tg, ready }), [tg, ready]);
}