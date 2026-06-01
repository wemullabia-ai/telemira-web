'use client'
import { useState } from 'react'
import PlayerTimestamp from './PlayerTimestamp'

const VIDEO_ID = '5_tBEaVdGFo'

// autoplay=1 requires mute=1 in browsers to be allowed
const buildSrc = (muted: boolean) =>
  `https://www.youtube.com/embed/${VIDEO_ID}?` +
  new URLSearchParams({
    autoplay: '1',
    mute: muted ? '1' : '0',
    loop: '1',
    playlist: VIDEO_ID,   // needed for loop to work
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
  }).toString()

export default function VideoPlayer() {
  const [muted, setMuted] = useState(true)

  return (
    <>
      <div className="player" style={{ position: 'relative' }}>
        <iframe
          key={muted ? 'muted' : 'unmuted'}
          src={buildSrc(muted)}
          title="Telemira – Episodio"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            aspectRatio: '16/9',
            display: 'block',
            border: 'none',
          }}
        />

        {/* Broadcast overlays — pointer-events: none so clicks pass through */}
        <div className="live-bug" style={{ pointerEvents: 'none' }}>● EN VIVO</div>
        <div className="channel-bug" style={{ pointerEvents: 'none' }}>tm7</div>
        <div className="lower-third" style={{ pointerEvents: 'none' }}>
          JULIETA MANSILLA · ¿DÓNDE ESTÁ?
          <small>COBERTURA ESPECIAL · CASO EN DESARROLLO · TELEMIRA</small>
        </div>
        <PlayerTimestamp />
      </div>

      {/* Player bar */}
      <div className="player-bar">
        {muted ? (
          <div
            className="pb-btn blink"
            onClick={() => setMuted(false)}
            style={{
              cursor: 'pointer',
              width: 'auto',
              padding: '0 6px',
              background: '#cc0000',
              color: '#ffff00',
              border: '1px outset #aa0000',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
            title="Activar audio"
          >
            🔇 ACTIVAR AUDIO
          </div>
        ) : (
          <div
            className="pb-btn"
            onClick={() => setMuted(true)}
            style={{ cursor: 'pointer', width: 'auto', padding: '0 6px' }}
            title="Silenciar"
          >
            🔊 SILENCIAR
          </div>
        )}
        <div
          className="pb-btn"
          onClick={() => window.open(`https://youtu.be/${VIDEO_ID}`, '_blank')}
          style={{ cursor: 'pointer', fontSize: 10, marginLeft: 'auto' }}
          title="Ver en YouTube"
        >
          ▶ YT
        </div>
      </div>
    </>
  )
}
