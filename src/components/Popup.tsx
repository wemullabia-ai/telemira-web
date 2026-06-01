'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import PopupEspalda from './PopupEspalda'

export default function Popup() {
  const [showEspalda, setShowEspalda] = useState(false)
  const [mounted, setMounted] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { y: -260, autoAlpha: 0 })
    gsap.to(el, { y: 0, autoAlpha: 1, duration: 0.85, delay: 1.6, ease: 'back.out(1.4)' })
  }, [])

  const close = () => {
    const el = ref.current
    if (!el) {
      setMounted(false)
      setShowEspalda(true)
      return
    }
    gsap.to(el, {
      y: -120, autoAlpha: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setMounted(false)
        setShowEspalda(true)
      }
    })
  }

  return (
    <>
      {mounted && (
        <div ref={ref} className="popup" id="popup" role="dialog" aria-label="Publicidad">
          <div className="bar">
            <span>Publicidad — TELEMIRA.com</span>
            <span>
              <button onClick={close}>_</button>
              <button>□</button>
              <button onClick={close}>X</button>
            </span>
          </div>
          <div className="body" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src="https://res.cloudinary.com/dlismekzd/image/upload/v1779551195/telemira/bronco.png"
              alt="Bronco"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div className="actions">
            <button onClick={close}>Más información</button>
            <button onClick={close}>Cerrar</button>
          </div>
        </div>
      )}
      {showEspalda && <PopupEspalda onClose={() => setShowEspalda(false)} />}
    </>
  )
}
