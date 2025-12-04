import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderActions from '../components/HeaderActions'

export default function Profile(): JSX.Element {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [ticket, setTicket] = useState('')
  const [group, setGroup] = useState('')
  const [photo, setPhoto] = useState<string | null>(
    localStorage.getItem('student_photo') ?? null
  )

  useEffect(() => {
    setName(localStorage.getItem('student_name') ?? '')
    setTicket(localStorage.getItem('student_ticket') ?? '')
    setGroup(localStorage.getItem('student_group') ?? '')
  }, [])

  function handleLogout() {
    localStorage.removeItem('student_name')
    localStorage.removeItem('student_ticket')
    localStorage.removeItem('student_group')
    localStorage.removeItem('student_photo')

    navigate('/')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" />
        </div>
        <div className="caption">Личный кабинет</div>
      </header>

      <HeaderActions />

      <section className="day-block" style={{ padding: 18 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Фото"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
              />
            ) : (
              <div style={{ color: 'var(--muted)' }}>Фото</div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{name || '-'}</div>
            <div style={{ color: 'var(--muted)', marginTop: 6 }}>
              Группа: {group || '-'}
            </div>
            <div style={{ color: 'var(--muted)', marginTop: 4 }}>
              Студ. билет: {ticket || '-'}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Кнопки */}
      <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
        <button
          className="btn btn--green"
          style={{ flex: 1 }}
          onClick={() => navigate('/schedule')}
        >
          Моё расписание
        </button>

        <button
          className="btn btn--red"
          style={{ flex: 1 }}
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>

      <div className="footer-space" />
    </div>
  )
}