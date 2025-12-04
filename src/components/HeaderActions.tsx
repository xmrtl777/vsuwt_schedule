// src/components/HeaderActions.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  showMySchedule?: boolean
}

export default function HeaderActions({ showMySchedule = true }: Props) {
  const navigate = useNavigate()

  return (
    <div className="actions">
      <button className="btn btn--blue" onClick={() => navigate('/profile')}>Личный кабинет</button>
      {showMySchedule && (
        <button className="btn btn--green" onClick={() => navigate('/schedule')}>Моё расписание</button>
      )}
      <button className="btn btn--orange" onClick={() => navigate('/university-schedule')}>Расписание вуза</button>
      <button className="btn btn--violet" onClick={() => navigate('/about-university')}>О вузе</button>
      <button className="btn btn--pink" style={{ gridColumn: '1 / -1' }} onClick={() => navigate('/record-book')}>Онлайн-зачетка</button>
    </div>
  )
}