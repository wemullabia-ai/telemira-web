'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

interface Props {
  onClose?: () => void
}

export default function PopupEspalda({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Force visibility before animating
    gsap.set(el, { autoAlpha: 0, scale: 0.75 })
    gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' })
  }, [])

  const close = () => {
    const el = ref.current
    if (!el) { onClose?.(); return }
    gsap.to(el, {
      autoAlpha: 0, scale: 0.75, duration: 0.2, ease: 'power2.in',
      onComplete: onClose
    })
  }

  return (
    <div
      ref={ref}
      className="popup popup-espalda"
      id="popup-espalda"
      role="dialog"
      aria-label="Servicio Alargamiento Espalda"
    >
      <div className="bar">
        <span>¡Oferta Especial! — TELEMIRA.com</span>
        <span>
          <button onClick={close}>_</button>
          <button>□</button>
          <button onClick={close}>X</button>
        </span>
      </div>
      <div className="body espalda-body">
        <div className="espalda-icon">🦴</div>
        <div className="espalda-text">
          <strong className="espalda-headline">
            Alarga tu espalda<br />en 7 días hábiles
          </strong>
          <p className="espalda-sub">
            Servicio profesional de alargamiento vertebral certificado. ¡Resultados garantizados!
          </p>
          <div className="espalda-badge">★ NUEVO SERVICIO ★</div>
        </div>
      </div>
      <div className="actions">
        <button onClick={close}>Más información</button>
        <button onClick={close}>Cerrar</button>
      </div>
    </div>
  )
}
