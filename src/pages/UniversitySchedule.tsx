// src/pages/UniversitySchedule.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderActions from '../components/HeaderActions'

const scheduleItems = [
  { group_id: '101', day: 'monday', time: '09:00', subject: 'Математика', teacher: 'Иванов', room: '101' },
  { group_id: '101', day: 'tuesday', time: '10:00', subject: 'Физика', teacher: 'Петров', room: '102' },
  { group_id: '102', day: 'monday', time: '09:00', subject: 'Информатика', teacher: 'Сидоров', room: '201' },
  { group_id: '103', day: 'wednesday', time: '12:00', subject: 'Биология', teacher: 'Иванова', room: '301' }
]

const groups = [
  { id: '101', name: 'Группа 101' },
  { id: '102', name: 'Группа 102' },
  { id: '103', name: 'Группа 103' }
]

const days = [
  { key: 'monday', label: 'Понедельник' },
  { key: 'tuesday', label: 'Вторник' },
  { key: 'wednesday', label: 'Среда' },
  { key: 'thursday', label: 'Четверг' },
  { key: 'friday', label: 'Пятница' }
]

export default function UniversitySchedule(): JSX.Element {
  const navigate = useNavigate()
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const grouped: Record<string, typeof scheduleItems> = {}
  days.forEach((d) => (grouped[d.key] = []))
  scheduleItems.forEach((item) => {
    if (grouped[item.day]) grouped[item.day].push(item)
  })

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" /></div>
        <div className="caption">Расписание всего вуза</div>
      </header>

      <HeaderActions />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <button className="btn" style={{ background: '#0f1720', color: 'var(--muted)' }} onClick={() => setSelectedGroup(null)}>Все группы</button>
        {groups.map(g => (
          <button key={g.id} className="btn" onClick={() => setSelectedGroup(g.id)} style={{ background: selectedGroup === g.id ? '#f59e0b' : 'transparent' }}>
            {g.name}
          </button>
        ))}
      </div>

      <div>
        {days.map(d => {
          const list = grouped[d.key] || []
          return (
            <section key={d.key} className="day-block" style={{ marginBottom: 12 }}>
              <div className="day-head">
                <div className="day-title">{d.label}</div>
              </div>

              <div>
                {list.length === 0 ? <div style={{ color: 'var(--muted)' }}>Пар нет</div> : (
                  list.map((l, idx) => (
                    <div key={idx} className={`lesson ${l.group_id === selectedGroup ? 'highlight' : ''}`}>
                      <div className="lesson-time">{l.time}</div>
                      <div className="lesson-body">
                        <div className="lesson-subject">{l.subject}</div>
                        <div className="lesson-teacher">{l.teacher}</div>
                        <div className="lesson-room">{l.room} {l.group_id ? `| Группа ${l.group_id}` : ''}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )
        })}
      </div>

      <div className="footer-space" />
    </div>
  )
}