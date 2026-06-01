'use client'
import { useRef, useEffect } from 'react'

export default function AdPayaso() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {
      // autoplay blocked — wait for user interaction then try again
      const resume = () => { v.play().catch(() => {}); document.removeEventListener('click', resume) }
      document.addEventListener('click', resume)
    })
  }, [])

  return (
    <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        onMouseEnter={() => { if (videoRef.current) videoRef.current.muted = false }}
        onMouseLeave={() => { if (videoRef.current) { videoRef.current.muted = true } }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dlismekzd/video/upload/q_40,w_400/v1779548410/payaso_ad_qz9k79.mp4"
          muted
          loop
          playsInline
          style={{ width: '100%', display: 'block', cursor: 'pointer' }}
        />
      </div>
      <div style={{
        background: '#cc0000', color: '#ffff00',
        fontFamily: 'Tahoma, sans-serif', fontWeight: 'bold',
        fontSize: 9, textAlign: 'center', padding: '3px 4px', letterSpacing: 1
      }}>
        ★ NUEVO DISCO — PAYASO TERRAPLANISTA ★
      </div>
    </div>
  )
}
