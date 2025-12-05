
// src/debug/debugLogger.ts

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'uncaught' | 'rejection'

function formatArg(a: any): string {
  try {
    if (typeof a === 'string') return a
    if (a instanceof Error) return a.stack ?? a.message
    return JSON.stringify(a, null, 2)
  } catch {
    return String(a)
  }
}

export function attachDOMLogger(): () => void {
  if (document.getElementById('__dbg_console')) return () => {}

  const box = document.createElement('div')
  box.id = '__dbg_console'

  Object.assign(box.style, {
    position: 'fixed',
    left: '8px',
    right: '8px',
    bottom: '8px',
    maxHeight: '44vh',
    overflow: 'auto',
    background: 'rgba(10,10,12,0.92)',
    color: '#e6eef8',
    fontSize: '12px',
    padding: '10px',
    borderRadius: '12px',
    zIndex: '999999',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    lineHeight: '1.35'
  })

  const header = document.createElement('div')
  header.style.display = 'flex'
  header.style.justifyContent = 'space-between'
  header.style.alignItems = 'center'
  header.style.marginBottom = '8px'

  const title = document.createElement('div')
  title.textContent = 'Debug Log'
  title.style.fontWeight = '700'
  title.style.color = '#cfe8ff'
  title.style.fontSize = '13px'

  const controls = document.createElement('div')
  controls.style.display = 'flex'
  controls.style.gap = '8px'

  const clearBtn = document.createElement('button')
  clearBtn.textContent = 'Очистить'
  Object.assign(clearBtn.style, {
    background: 'transparent',
    color: '#9fb7ff',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '4px 6px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  })
  clearBtn.onclick = () => {
    Array.from(box.children).forEach((c) => {
      if (c !== header) c.remove()
    })
    box.appendChild(header)
  }

  const closeBtn = document.createElement('button')
  closeBtn.textContent = 'Свернуть'
  Object.assign(closeBtn.style, {
    background: 'transparent',
    color: '#9fb7ff',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '4px 6px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  })

  let collapsed = false
  closeBtn.onclick = () => {
    collapsed = !collapsed
    if (collapsed) {
      Array.from(box.children).forEach((c) => c !== header && c.remove())
      box.style.maxHeight = '40px'
      closeBtn.textContent = 'Развернуть'
    } else {
      box.style.maxHeight = '44vh'
      closeBtn.textContent = 'Свернуть'
    }
  }

  controls.appendChild(clearBtn)
  controls.appendChild(closeBtn)
  header.appendChild(title)
  header.appendChild(controls)
  box.appendChild(header)
  document.body.appendChild(box)

  function append(level: LogLevel, ...args: any[]) {
    const row = document.createElement('div')
    row.style.marginBottom = '8px'
    row.style.whiteSpace = 'pre-wrap'
    row.style.fontFamily = 'monospace'

    const time = new Date().toLocaleTimeString()
    const prefix = `[${time}] [${level}]` 
    const text = args.map(formatArg).join(' ')

    row.textContent = prefix + text

    if (['error', 'uncaught', 'rejection'].includes(level)) {
      row.style.color = '#ffb4b4'
    } else if (level === 'warn') {
      row.style.color = '#ffd08a'
    } else {
      row.style.color = '#cfe8ff'
    }

    box.appendChild(row)
    box.scrollTop = box.scrollHeight
  }

  const orig = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
  }

  console.log = (...a) => { append('log', ...a); orig.log(...a) }
  console.info = (...a) => { append('info', ...a); orig.info(...a) }
  console.warn = (...a) => { append('warn', ...a); orig.warn(...a) }
  console.error = (...a) => { append('error', ...a); orig.error(...a) }

  const onError = (ev: ErrorEvent) => {
    append('uncaught', ev.error?.stack ?? ev.message)
  }
  const onRej = (ev: PromiseRejectionEvent) => {
    append('rejection', ev.reason)
  }


window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onRej)

  return () => {
    console.log = orig.log
    console.info = orig.info
    console.warn = orig.warn
    console.error = orig.error
    window.removeEventListener('error', onError)
    window.removeEventListener('unhandledrejection', onRej)
    box.remove()
  }
}