import React from 'react'
import App from '../App'

export function Root() {
  // простой контейнер — фон и отступы через CSS
  return (
    <div className="app-root">
      <App />
    </div>
  )
}