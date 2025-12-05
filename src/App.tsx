

// src/App.tsx
import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import UserChoice from './pages/UserChoice'
import StudentLogin from './pages/StudentLogin'
import Schedule from './pages/Schedule'
import UniversitySchedule from './pages/UniversitySchedule'
import AboutUniversity from './pages/AboutUniversity'
import RecordBook from './pages/RecordBook'
import Profile from './pages/Profile'
import EmployeePage from './pages/EmployeePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserChoice />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/university-schedule" element={<UniversitySchedule />} />
        <Route path="/about-university" element={<AboutUniversity />} />
        <Route path="/record-book" element={<RecordBook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </HashRouter>
  )
}

