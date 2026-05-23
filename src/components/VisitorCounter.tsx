'use client'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const START = 1472983

export default function VisitorCounter() {
  const [count, setCount] = useState(START)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate count-up on load
    const obj = { val: START - 1200 }
    gsap.to(obj, {
      val: START,
      duration: 2.2,
      delay: 0.5,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(obj.val)),
    })
    // Slow increment
    const id = setInterval(() => setCount(v => v + 1), 9000)
    return () => clearInterval(id)
  }, [])

  const display = String(count).padStart(8, '0').split('').join(' ')

  return <div className="counter" ref={divRef}>{display}</div>
}
