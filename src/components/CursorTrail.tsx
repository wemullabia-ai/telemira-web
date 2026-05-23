'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function CursorTrail() {
  useEffect(() => {
    const stars = ['★', '✦', '·', '✶', '⋆']

    const onMove = (e: MouseEvent) => {
      const el = document.createElement('span')
      el.textContent = stars[Math.floor(Math.random() * stars.length)]
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        font-size: ${8 + Math.random() * 10}px;
        color: hsl(${Math.random() * 60 + 30}, 100%, 60%);
        z-index: 99999;
        user-select: none;
        transform: translate(-50%, -50%);
      `
      document.body.appendChild(el)
      gsap.to(el, {
        y: -22, opacity: 0, duration: 0.7 + Math.random() * 0.4, ease: 'power1.out',
        onComplete: () => el.remove()
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
