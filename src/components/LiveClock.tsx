'use client'
import { useState, useEffect } from 'react'

function pad(n: number) { return n < 10 ? '0' + n : '' + n }

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function LiveClock() {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const fecha = `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
      const hora = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds())
      setDisplay(`${fecha} | ${hora}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{display}</span>
}
