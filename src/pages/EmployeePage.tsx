// src/pages/EmployeePage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EmployeePage(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" /></div>
        <div className="caption">Сотрудники</div>
      </header>

      <section className="day-block">
        <h3 style={{ margin: 0 }}>Страница сотрудника</h3>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>Здесь будет информация и инструменты для сотрудников организации.</p>
      </section>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => navigate('/')}>Назад</button>
      </div>

      <div className="footer-space" />
    </div>
  )
}