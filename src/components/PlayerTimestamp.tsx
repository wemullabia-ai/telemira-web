'use client'
import { useState, useEffect } from 'react'

function pad(n: number) { return n < 10 ? '0' + n : '' + n }

export default function PlayerTimestamp() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + ' HORA LOCAL')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <div className="timestamp">{time}</div>
}
