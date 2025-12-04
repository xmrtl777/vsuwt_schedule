// src/pages/StudentLogin.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentLogin(): JSX.Element {
  const navigate = useNavigate()
  const [name, setName] = useState(localStorage.getItem('student_name') ?? '')
  const [ticket, setTicket] = useState(localStorage.getItem('student_ticket') ?? '')
  const [group, setGroup] = useState(localStorage.getItem('student_group') ?? '')

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    localStorage.setItem('student_name', name.trim())
    localStorage.setItem('student_ticket', ticket.trim())
    localStorage.setItem('student_group', group.trim())
    navigate('/schedule')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" />
        </div>
        <div className="caption">Введите данные студента</div>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>ФИО</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иванов Иван Иванович"
            style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text)' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>Номер студенческого билета</span>
          <input
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder="12345678"
            style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text)' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>Группа</span>
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="101"
            style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text)' }}
          />
        </label>

        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <button type="submit" className="btn btn--blue" style={{ flex: 1 }}>Сохранить и открыть расписание</button>
          <button type="button" className="btn" style={{ flex: 1 }} onClick={() => navigate('/')}>Отмена</button>
        </div>
      </form>

      <div className="footer-space" />
    </div>
  )
}