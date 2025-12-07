// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import UserChoice from './pages/UserChoice'
import StudentLogin from './pages/StudentLogin'
import Schedule from './pages/Schedule'
import UniversitySchedule from './pages/UniversitySchedule'
import AboutUniversity from './pages/AboutUniversity'
import RecordBook from './pages/RecordBook'
import Profile from './pages/Profile'
import EmployeePage from './pages/EmployeePage'
import {LaunchParamsPage} from './pages/LaunchParamsPage'
import {InitDataPage} from './pages/InitDataPage'
import {ThemeParamsPage} from './pages/ThemeParamsPage'
import {IndexPage} from './pages/IndexPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная точка входа */}
        <Route path="/" element={<UserChoice />} />

        {/* Студент */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/record-book" element={<RecordBook />} />

        {/* Сотрудник */}
        <Route path="/employee" element={<EmployeePage />} />

        {/* Дополнительные страницы */}
        <Route path="/university-schedule" element={<UniversitySchedule />} />
        <Route path="/about-university" element={<AboutUniversity />} />
        <Route path="/launch-params" element={<LaunchParamsPage />} />
        <Route path="/init-data" element={<InitDataPage />} />
        <Route path="/theme-params" element={<ThemeParamsPage />} />
        <Route path="/index-page" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  )
}