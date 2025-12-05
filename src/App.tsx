// src/App.tsx
import React from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import UserChoice from './pages/UserChoice'
/* остальные импорты ваших страниц */

function DebugBanner() {
  const tg = (window as any).Telegram?.WebApp
  const initData = tg?.initData || tg?.initDataUnsafe ||  null
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 8, color: '#cbd5e1', margin: 12 }}>
      <div style={{ fontSize: 13, color: '#94a3b8' }}>Debug</div>
      <div style={{ fontSize: 14, marginTop: 6 }}>
        Telegram.WebApp: <strong style={{ color: tg ? '#34d399' : '#fb7185' }}>{tg ? 'FOUND' : 'NOT FOUND'}</strong>
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
        initData: <code style={{ color: '#cbd5e1' }}>{initData ? JSON.stringify(initData).slice(0, 200) : '—'}</code>
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
        URL: <code style={{ color: '#cbd5e1' }}>{location.href}</code>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <DebugBanner />
        <Routes>
          <Route path="/" element={<UserChoice />} />
          {/* остальные маршруты */}
        </Routes>
      </div>
    </HashRouter>
  )
}