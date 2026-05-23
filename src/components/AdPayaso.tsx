'use client'
import { useRef } from 'react'

export default function AdPayaso() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="box" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        onMouseEnter={() => { if (videoRef.current) videoRef.current.muted = false }}
        onMouseLeave={() => { if (videoRef.current) videoRef.current.muted = true }}
      >
        <video
          ref={videoRef}
          src="/uploads/payaso-ad.mp4"
          autoPlay muted loop playsInline
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
