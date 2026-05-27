'use client'
import { useEffect, useState } from 'react'

const PHASES = [
  { text: 'MENSAJE ENCRIPTADO :: ID_JM :: ', className: 'hacked-sys', speed: 40 },
  { text: 'ENCONTRÉ LOS ARCHIVOS. ESTÁN AQUÍ.', className: 'hacked-title', speed: 60 },
  { text: 'VER LOS CAPÍTULOS COMPLETOS EN EL YOUTUBE ►', className: 'hacked-cta', speed: 35 },
]

export default function HackedBanner() {
  const [phase, setPhase] = useState(0)
  const [displayed, setDisplayed] = useState<string[]>(['', '', ''])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return

    const current = PHASES[phase]
    if (!current) { setDone(true); return }

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(prev => {
        const next = [...prev]
        next[phase] = current.text.slice(0, i)
        return next
      })
      if (i >= current.text.length) {
        clearInterval(interval)
        // short pause before next phase
        setTimeout(() => setPhase(p => p + 1), 180)
      }
    }, current.speed)

    return () => clearInterval(interval)
  }, [phase, done])

  const allDone = phase >= PHASES.length

  return (
    <a
      href="https://www.youtube.com/channel/UCYndcBw_lDj4WqHUtvdrr4w"
      target="_blank"
      rel="noopener noreferrer"
      className="hacked-banner"
    >
      <span className="hacked-icon">🐙</span>
      <div className="hacked-content">
        <span className="hacked-sys">
          {displayed[0]}
          {phase === 0 && !allDone && <span className="terminal-cursor">█</span>}
        </span>
        {(displayed[1] || phase > 1) && (
          <span className="hacked-title">
            {displayed[1]}
            {phase === 1 && !allDone && <span className="terminal-cursor">█</span>}
          </span>
        )}
        {(displayed[2] || phase > 2) && (
          <span className="hacked-cta">
            {displayed[2]}
            {phase === 2 && !allDone && <span className="terminal-cursor">█</span>}
            {allDone && <span className="terminal-cursor-end">█</span>}
          </span>
        )}
      </div>
    </a>
  )
}
