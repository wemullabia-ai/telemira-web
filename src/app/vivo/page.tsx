'use client'
import { useRef, useState, useEffect, useCallback } from 'react'

const PLAYLIST = [
  { title: 'Telemira Bajo Control',       file: 'Telemira Bajo Control.mp3' },
  { title: 'Vamos Por La Copa',           file: 'Vamos Por La Copa.mp3' },
  { title: 'Poetas Extremos',             file: 'Poetas Extremos.mp3' },
  { title: 'Usa Mi Ropa No Suelta La Tele', file: 'Usa mi ropa, no suelta la tele,.mp3' },
  { title: 'Stadium Glasses',             file: 'Stadium Glasses.mp3' },
  { title: 'Ping-Pong Petals',            file: 'Ping-Pong Petals.mp3' },
  { title: 'Ping-Pong Petals (Alt)',      file: 'Ping-Pong Petals (1).mp3' },
  { title: 'Pudding Raincoat',            file: 'Pudding Raincoat.mp3' },
  { title: 'Morning Signal',              file: 'Morning Signal.mp3' },
  { title: 'Telemira ID Especial',        file: 'ElevenLabs_2026-05-24T20_18_51__s100_v3.mp3' },
  { title: 'El Faraón - Promo Oficial',   file: 'ElevenLabs_2026-05-24T20_31_54_El Faraon - Full, Clear, Mellow_pvc_sp100_s50_sb88_v3.mp3' },
]

function EqBars({ active }: { active: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
      {[60, 90, 40, 75, 55, 80, 35, 65, 85, 50].map((h, i) => (
        <div key={i} style={{
          width: 4,
          height: active ? `${h}%` : '8%',
          background: `hsl(${50 - i * 3}, 100%, 50%)`,
          transition: 'height 0.1s',
          animation: active ? `eq-bar-${i % 3} ${0.4 + i * 0.07}s ease-in-out infinite alternate` : 'none',
        }} />
      ))}
    </div>
  )
}

export default function Vivo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [idx, setIdx]         = useState(0)
  const [playing, setPlaying] = useState(true) // Autoplay de inmediato
  const [muted, setMuted]     = useState(true) // Empezar silenciado para cumplir políticas de autoplay
  const [volume, setVolume]   = useState(80)
  const [showUnmute, setShowUnmute] = useState(true)
  const [time, setTime]       = useState('0:00')
  const [showPlaylist, setShowPlaylist] = useState(false)

  const track = PLAYLIST[idx]
  const src   = `/uploads/${encodeURIComponent(track.file)}`

  // Sincronizar de forma robusta el elemento audio con el estado de React
  useEffect(() => {
    const a = audioRef.current
    if (!a) return

    // Sincronizar origen (solo si cambia para evitar clicks/cortes de carga)
    const absoluteSrc = window.location.origin + src
    if (a.src !== absoluteSrc) {
      a.src = src
    }

    a.muted = muted
    a.volume = volume / 100

    if (playing) {
      a.play().catch((err) => {
        console.warn("Reproducción demorada o bloqueada por el navegador:", err)
      })
    } else {
      a.pause()
    }
  }, [idx, playing, muted, volume, src])

  // Reloj digital LED
  useEffect(() => {
    const id = setInterval(() => {
      const a = audioRef.current
      if (!a || a.paused) return
      const s = Math.floor(a.currentTime)
      setTime(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
    }, 500)
    return () => clearInterval(id)
  }, [])

  const goNext = useCallback(() => setIdx(i => (i + 1) % PLAYLIST.length), [])
  const goPrev = useCallback(() => setIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length), [])

  const activateSound = () => {
    setMuted(false)
    setShowUnmute(false)
    setPlaying(true)
  }

  const togglePlay = () => {
    setPlaying(p => !p)
  }

  const stop = () => {
    setPlaying(false)
    const a = audioRef.current
    if (a) {
      a.currentTime = 0
    }
    setTime('0:00')
  }

  const toggleMute = () => {
    setMuted(m => !m)
  }

  const changeVolume = (v: number) => {
    setVolume(v)
  }

  const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(to bottom, #2a2a3a, #111122)',
    color: '#ffcc00', border: '1px solid #444',
    padding: '4px 10px', fontSize: 13, cursor: 'pointer',
    fontFamily: 'monospace', fontWeight: 'bold',
    boxShadow: '0 2px 0 #000',
  }

  return (
    <div style={{
      background: '#000080', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tahoma, Arial, sans-serif',
      padding: '20px', boxSizing: 'border-box',
    }}>

      {/* Barra superior */}
      <div style={{
        width: '100%', maxWidth: 700, background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box', borderBottom: '2px solid #ffcc00',
      }}>
        <a href="/" style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: 12, textDecoration: 'none' }}>← Volver al sitio</a>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 }}>TELEMIRA — SEÑAL EN VIVO</div>
        <div style={{ width: 80 }} />
      </div>

      {/* Ventana principal */}
      <div style={{ width: '100%', maxWidth: 700, border: '3px solid #ffcc00', borderTop: 'none', background: '#000080' }}>

        {/* Titlebar */}
        <div style={{
          background: 'linear-gradient(to right, #001a6e, #1084d0)',
          padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '2px solid #ffcc00',
        }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>📺 TELEMIRA.COM — Señal en Vivo</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['_', '□', 'X'].map(b => (
              <div key={b} style={{
                background: '#d4d0c8', color: '#000', width: 18, height: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 'bold', border: '1px outset #fff', cursor: 'default'
              }}>{b}</div>
            ))}
          </div>
        </div>

        {/* Banner BAJO CONSTRUCCIÓN */}
        <div style={{ background: '#001a6e', padding: '14px 24px', textAlign: 'center', borderBottom: '2px solid #ffcc00' }}>
          <div style={{
            display: 'inline-block', background: '#cc0000', color: '#ffff00',
            fontWeight: 'bold', fontSize: 20, padding: '6px 22px', letterSpacing: 3,
            border: '3px solid #ffff00', textShadow: '1px 1px 0 #000',
            boxShadow: '0 0 16px rgba(255,0,0,0.6)',
          }}>🚧 BAJO CONSTRUCCIÓN 🚧</div>
          <div style={{ color: '#aaa', fontSize: 11, marginTop: 8, letterSpacing: 1 }}>
            Estamos trabajando para traerte la mejor señal. —{' '}
            <span style={{ color: '#ffcc00' }}>Canal 7 Telemira</span>
          </div>
        </div>

        {/* Imagen mono */}
        <div style={{ width: '100%', background: '#000', position: 'relative' }}>
          <img src="/uploads/bajo-construccion-mono.jpg" alt="Bajo Construcción" style={{ width: '100%', display: 'block' }} />
          {showUnmute && (
            <div onClick={activateSound} style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,26,0.55)', cursor: 'pointer', zIndex: 10,
            }}>
              <div style={{
                background: '#cc0000', color: '#ffff00', fontWeight: 'bold',
                fontSize: 15, padding: '10px 22px', letterSpacing: 2,
                border: '2px solid #ffcc00', boxShadow: '0 0 18px rgba(255,0,0,0.7)',
                animation: 'blink 1s step-end infinite',
              }}>🔇 CLIC PARA ACTIVAR SONIDO</div>
            </div>
          )}
        </div>

        {/* Barra de canal */}
        <div style={{
          background: '#001a6e', borderTop: '2px solid #ffcc00',
          padding: '6px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 16, fontSize: 10, color: '#aaa', letterSpacing: 1,
        }}>
          <span style={{ color: '#ffcc00' }}>● EN VIVO</span>
          <span>PRÓXIMAMENTE</span>
          <span style={{ color: '#ffcc00' }}>TELEMIRA CANAL 7</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          WINAMP — SKIN TELEMIRA
      ══════════════════════════════════════ */}
      <div style={{
        width: '100%', maxWidth: 700,
        background: '#0d0d1a',
        border: '2px solid #ffcc00', borderTop: 'none',
        fontFamily: '"Courier New", monospace',
      }}>

        {/* Titlebar Winamp */}
        <div style={{
          background: 'linear-gradient(to right, #cc0000, #001a6e)',
          padding: '3px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #ffcc00',
        }}>
          <span style={{ color: '#ffcc00', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 }}>
            📻 TELEMIRA MUSIC PLAYER v1.0
          </span>
          <div style={{ display: 'flex', gap: 3 }}>
            {['–', '□', '✕'].map(b => (
              <div key={b} style={{
                background: '#333', color: '#ffcc00', width: 14, height: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 'bold', border: '1px outset #555', cursor: 'default'
              }}>{b}</div>
            ))}
          </div>
        </div>

        {/* Display LED */}
        <div style={{
          background: '#0a0a00', border: '2px inset #333',
          margin: '8px 8px 4px', padding: '6px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}>
          <div style={{ color: '#00ff44', fontSize: 22, fontWeight: 'bold', minWidth: 52, letterSpacing: 2 }}>
            {time}
          </div>
          <div style={{ flex: 1, overflow: 'hidden', borderLeft: '1px solid #333', paddingLeft: 8 }}>
            <div style={{
              color: '#ffcc00', fontSize: 11, whiteSpace: 'nowrap',
              animation: 'marquee-song 16s linear infinite',
            }}>
              ♫ &nbsp; {track.title} &nbsp; — &nbsp; TELEMIRA FM 99.1 &nbsp; ★ &nbsp;
              {track.title} &nbsp; — &nbsp; TELEMIRA FM 99.1 &nbsp; ★ &nbsp;
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #333', paddingLeft: 8 }}>
            <EqBars active={playing} />
          </div>
        </div>

        {/* Controles transporte + volumen */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px 6px', flexWrap: 'wrap' }}>
          <button onClick={goPrev} style={btnStyle} title="Anterior">⏮</button>
          <button onClick={togglePlay} style={btnStyle} title={playing ? 'Pausar' : 'Play'}
            onMouseDown={e => (e.currentTarget.style.transform = 'translateY(1px)')}
            onMouseUp={e => (e.currentTarget.style.transform = '')}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={stop} style={btnStyle} title="Stop">⏹</button>
          <button onClick={goNext} style={btnStyle} title="Siguiente">⏭</button>

          <div style={{ width: 1, height: 28, background: '#333', margin: '0 3px' }} />

          <button onClick={toggleMute} style={{ ...btnStyle, color: muted ? '#555' : '#ffcc00', border: `1px solid ${muted ? '#555' : '#444'}` }}>
            {muted ? '🔇' : '🔊'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
            <span style={{ color: '#888', fontSize: 9 }}>VOL</span>
            <input type="range" min={0} max={100} value={volume}
              onChange={e => changeVolume(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#ffcc00', cursor: 'pointer', maxWidth: 110 }} />
            <span style={{ color: '#ffcc00', fontSize: 9, minWidth: 26 }}>{volume}%</span>
          </div>

          <div style={{ display: 'flex', gap: 3 }}>
            <button
              onClick={() => setShowPlaylist(p => !p)}
              style={{ ...btnStyle, fontSize: 9, padding: '4px 7px', color: showPlaylist ? '#00ff88' : '#ffcc00', letterSpacing: 1 }}
              title="Playlist"
            >PL</button>
            <div style={{
              background: '#cc0000', color: '#ffcc00', fontSize: 9, fontWeight: 'bold',
              padding: '4px 6px', border: '1px solid #ffcc00', letterSpacing: 1, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center',
            }}>FM 99.1</div>
          </div>
        </div>

        {/* Playlist desplegable */}
        {showPlaylist && (
          <div style={{ background: '#06060e', borderTop: '1px solid #222', maxHeight: 180, overflowY: 'auto' }}>
            {PLAYLIST.map((t, i) => (
              <div key={i} onClick={() => { setIdx(i); setPlaying(true) }}
                style={{
                  padding: '5px 12px', fontSize: 10, cursor: 'pointer',
                  display: 'flex', gap: 8, alignItems: 'center',
                  background: i === idx ? '#001a4e' : 'transparent',
                  color: i === idx ? '#ffcc00' : '#888',
                  borderBottom: '1px solid #111',
                }}
                onMouseEnter={e => { if (i !== idx) (e.currentTarget as HTMLElement).style.background = '#0d0d2e' }}
                onMouseLeave={e => { if (i !== idx) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <span style={{ color: i === idx ? '#00ff88' : '#444', minWidth: 14 }}>
                  {i === idx && playing ? '▶' : `${i + 1}.`}
                </span>
                <span style={{ flex: 1 }}>{t.title}</span>
                {i === idx && <span style={{ color: '#00ff88', fontSize: 9 }}>REPRODUCIENDO</span>}
              </div>
            ))}
          </div>
        )}

        {/* Fila info actual */}
        <div style={{
          background: '#06060e', borderTop: '1px solid #222',
          padding: '4px 10px', fontSize: 9, color: '#555',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{ color: '#ffcc00' }}>{String(idx + 1).padStart(2, '0')}. {track.title}</span>
          <span style={{ color: '#555' }}>{idx + 1} / {PLAYLIST.length}</span>
          <span style={{ color: '#333' }}>TELEMIRA © 1994</span>
        </div>

        <audio ref={audioRef} onEnded={goNext} preload="auto" />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes marquee-song { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes eq-bar-0 { from{height:20%} to{height:95%} }
        @keyframes eq-bar-1 { from{height:40%} to{height:80%} }
        @keyframes eq-bar-2 { from{height:15%} to{height:70%} }
      `}</style>
    </div>
  )
}
