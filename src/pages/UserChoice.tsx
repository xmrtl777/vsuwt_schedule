// src/pages/UserChoice.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserChoice(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" />
        </div>
      </header>

      <div style={{ display: 'grid', gap: 12 }}>
        <button className="btn btn--blue" style={{ padding: '16px', fontSize: 16 }} onClick={() => navigate('/student-login')}>
          Я — студент
        </button>
        <button className="btn btn--orange" style={{ padding: '16px', fontSize: 16 }} onClick={() => navigate('/employee')}>
          Сотрудник организации
        </button>
      </div>

      <div className="footer-space" />
    </div>
  )
}