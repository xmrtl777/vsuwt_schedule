// src/pages/Schedule.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderActions from '../components/HeaderActions'

const schedule = [
  { group_id: '101', day: 'monday', time: '13:35', subject: 'Физическая культура', teacher: '', room: 'ул. Большая Печёрская, д. 93' },
  { group_id: '101', day: 'monday', time: '15:40', subject: 'Инструментальные средства программирования', teacher: 'Мария Александровна Трухина', room: 'а. 570' },
  { group_id: '101', day: 'monday', time: '15:40', subject: 'Основы операционных систем', teacher: 'Анатолий Владимирович Шеянов', room: 'а. 562' }
]

export default function Schedule(): JSX.Element {
  const navigate = useNavigate()
  const defaultGroup = (localStorage.getItem('student_group') ?? '101').toString()
  const [selectedGroup] = useState<string | null>(defaultGroup)

  const days = [
    { key: 'monday', label: 'Понедельник', date: '1 декабря' },
    { key: 'tuesday', label: 'Вторник', date: '' },
    { key: 'wednesday', label: 'Среда', date: '' },
    { key: 'thursday', label: 'Четверг', date: '' },
    { key: 'friday', label: 'Пятница', date: '' }
  ]

  const grouped: Record<string, any[]> = {}
  days.forEach(d => (grouped[d.key] = []))
  schedule.forEach(item => {
    if (grouped[item.day]) grouped[item.day].push(item)
  })

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" /></div>
        <div className="caption">Ваше расписание</div>
      </header>

      <HeaderActions />

      <div className="day-block">
        <div className="day-head">
          <div className="day-title">Понедельник</div>
          <div className="day-date">1 декабря</div>
        </div>

        <div>
          {grouped['monday'].map((l, i) => (
            <div key={i} className={`lesson ${l.group_id === selectedGroup ? 'highlight' : ''}`}>
              <div className="lesson-time">{l.time}</div>
              <div className="lesson-body">
                <div className="lesson-subject">{l.subject}</div>
                <div className="lesson-teacher">{l.teacher ? l.teacher : ''}</div>
                <div className="lesson-room">{l.room}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ color: 'var(--muted)', fontSize: 16 }}>Вторник</div>
      </div>

      <div className="footer-space" />
    </div>
  )
}