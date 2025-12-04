// src/pages/RecordBook.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderActions from '../components/HeaderActions'

type Subject = { name: string; grade: string }

export default function RecordBook(): JSX.Element {
  const navigate = useNavigate()
  const [name, setName] = useState(localStorage.getItem('student_name') ?? '')
  const [ticket, setTicket] = useState(localStorage.getItem('student_ticket') ?? '')
  const [group, setGroup] = useState(localStorage.getItem('student_group') ?? '')
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    setSubjects([
      { name: 'Математика', grade: '5' },
      { name: 'Физика', grade: '4' },
      { name: 'Информатика', grade: '5' }
    ])
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" /></div>
        <div className="caption">Онлайн-зачетка</div>
      </header>

      <HeaderActions />

      <section className="day-block">
        <h3 style={{ margin: 0 }}>Студент</h3>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>ФИО: {name || '(не указано)'}</p>
        <p style={{ color: 'var(--muted)' }}>Группа: {group || '(не указана)'}</p>
        <p style={{ color: 'var(--muted)' }}>Студ. билет: {ticket || '(не указан)'}</p>
      </section>

      <section className="day-block">
        <h3 style={{ margin: 0 }}>Дисциплины и оценки</h3>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {subjects.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02))' }}>
              <div style={{ color: 'var(--text)' }}>{s.name}</div>
              <div style={{ fontWeight: 700 }}>{s.grade}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => navigate('/schedule')}>Назад к личному расписанию</button>
      </div>

      <div className="footer-space" />
    </div>
  )
}