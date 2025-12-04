// src/pages/AboutVGUWT.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderActions from '../components/HeaderActions'

export default function AboutVGUWT(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="app">
      <header className="header">
        <div className="logo"><img src={`${import.meta.env.BASE_URL}vsuwt_logo.png`} alt="ВГУВТ" /></div>
        <div className="caption">О ВГУВТ</div>
      </header>

      <HeaderActions />

      <section className="day-block">
        <h3 style={{ margin: 0, fontSize: 18 }}>ВГУВТ</h3>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>
          ВГУВТ — Волжский государственный университет водного транспорта — федеральное государственное бюджетное образовательное учреждение высшего образования системы Федерального агентства морского и речного транспорта.
        </p>
      </section>

      <section className="day-block">
        <h3 style={{ margin: 0, fontSize: 18 }}>Структура</h3>
        <ul style={{ paddingLeft: 18, color: 'var(--muted)', marginTop: 8 }}>
          <li><strong>Институт «Морская академия»</strong>. Готовит инженеров по специальностям «Судовождение», «Эксплуатация судового электрооборудования и средств автоматики» и другим.</li>
          <li><strong>Институт кораблестроения и инфраструктуры водного транспорта</strong>. Готовит инженеров по направлениям «Техносферная безопасность», «Строительство», «Проектирование и постройка кораблей…» и другим.</li>
          <li><strong>Институт экономики, управления и права</strong>. Готовит специалистов по направлениям «Технология транспортных процессов», «Экономика», «Менеджмент» и другим.</li>
        </ul>
      </section>

      <section className="day-block">
        <h3 style={{ margin: 0, fontSize: 18 }}>Программы обучения</h3>
        <ul style={{ paddingLeft: 18, color: 'var(--muted)', marginTop: 8 }}>
          <li>Бакалавриат, специалитет, магистратура и аспирантура</li>
          <li>Программы среднего профессионального образования (СПО)</li>
        </ul>
        <p style={{ marginTop: 8, color: 'var(--muted)' }}>
          
        </p>
      </section>

      <section className="day-block">
        <h3 style={{ margin: 0, fontSize: 18 }}>Особенности</h3>
        <ul style={{ paddingLeft: 18, color: 'var(--muted)', marginTop: 8 }}>
          <li>Тренажёрная база для судоводителей, механиков, электромехаников, радистов и экологов.</li>
          <li>Музей речного флота.</li>
        </ul>
      </section>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => navigate('/schedule')}>Назад к личному расписанию</button>
      </div>

      <div className="footer-space" />
    </div>
  )
}