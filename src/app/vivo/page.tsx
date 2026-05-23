'use client'
import { useState, useEffect, useRef } from 'react'

const VIDEOS = [
  'Broncooo.mp4',
  'Corazon de alcncía.mp4',
  'Demasiado vestidos promo.mp4',
  'Doctores millonarios.mp4',
  'FUTBOLISTA FRANCO.mp4',
  'Homotherian.mp4',
  'K PAP V2.mp4',
  'Luis Facha.mp4',
  'PATAENLOCICO.mp4',
  'Profr Fabian corto.mp4',
  'Shosdelacul.mp4',
  'Statusbucks.mp4',
  'adam cocina.mp4',
  'alargamiento de espalda.mp4',
  'arepa franklin 1.mp4',
  'azotea.mp4',
  'bozal.mp4',
  'bullyns animal.mp4',
  'bussiness kids kit.mp4',
  'cerebro anime.mp4',
  'chiguaguas.mp4',
  'cutecuernas.mp4',
  'escorpio.mp4',
  'formertrans.mp4',
  'gag mambo.mp4',
  'hijo.mp4',
  'manicomio de plantas.mp4',
  'pancho puelma junior.mp4',
  'para sonreír.mp4',
  'perkins mujeres.mp4',
  'perkins.mp4',
  'poetas extremos.mp4',
  'rechilcer.mp4',
  'vr set for babies.mp4',
  'zalo reyes.mp4',
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Vivo() {
  const [playlist, setPlaylist] = useState<string[]>([])
  const [idx, setIdx] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setPlaylist(shuffle(VIDEOS))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playlist])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [idx, playlist])

  const prev = () => setIdx(i => (i - 1 + playlist.length) % playlist.length)
  const next = () => setIdx(i => (i + 1) % playlist.length)

  const current = playlist[idx]

  return (
    <div style={{
      background: '#000', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tahoma, Arial, sans-serif'
    }}>

      {/* top bar */}
      <div style={{
        width: '100%', background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box'
      }}>
        <a href="/" style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: 12, textDecoration: 'none' }}>
          ← Volver al sitio
        </a>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 }}>
          TELEMIRA — SEÑAL EN VIVO
        </div>
        <div style={{ color: '#ffcc00', fontSize: 11 }}>
          {playlist.length > 0 ? `${idx + 1} / ${playlist.length}` : ''}
        </div>
      </div>

      {/* player */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 960, flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', position: 'relative' }}>
          {current && (
            <video
              ref={videoRef}
              key={current}
              src={`/uploads/videos/${encodeURIComponent(current)}`}
              autoPlay
              controls
              playsInline
              onEnded={next}
              style={{ width: '100%', display: 'block', maxHeight: '80vh' }}
            />
          )}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: '#cc0000', color: '#fff',
            fontWeight: 'bold', fontSize: 11, padding: '2px 8px', borderRadius: 2
          }}>● EN VIVO</div>
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: '#003399', color: '#ffcc00',
            fontWeight: 'bold', fontSize: 11, padding: '2px 8px', borderRadius: 2,
            fontStyle: 'italic'
          }}>tm</div>
        </div>
      </div>

      {/* bottom bar */}
      <div style={{
        width: '100%', background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box'
      }}>
        <div style={{ color: '#ccc', fontSize: 10, letterSpacing: 1 }}>
          {current?.replace('.mp4', '').toUpperCase()}
        </div>
        <div style={{
          display: 'flex', gap: 20, alignItems: 'center',
          color: '#888', fontSize: 10, letterSpacing: 1
        }}>
          <span style={{ color: '#ffcc00' }}>CONTROLES DE TECLADO:</span>
          <span>⬅ Video anterior</span>
          <span>⬆ Subir volumen</span>
          <span>⬇ Bajar volumen</span>
          <span>➡ Video siguiente</span>
          <span>ESPACIO Pausa</span>
        </div>
      </div>

    </div>
  )
}
