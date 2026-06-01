'use client'
import { useState } from 'react'
import PlayerTimestamp from './PlayerTimestamp'

const VIDEO_ID = '5_tBEaVdGFo'

// autoplay=1 requires mute=1 in browsers; user clicks overlay to unmute
const buildSrc = (muted: boolean) =>
  `https://www.youtube.com/embed/${VIDEO_ID}?` +
  new URLSearchParams({
    autoplay: '1',
    mute: muted ? '1' : '0',
    loop: '1',
    playlist: VIDEO_ID,   // needed for loop to work
    controls: '0',        // hide YouTube controls (we show our own overlay)
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    enablejsapi: '1',
  }).toString()

export default function VideoPlayer() {
  const [muted, setMuted] = useState(true)

  const activateAudio = () => {
    setMuted(false)
  }

  return (
    <>
      <div className="player" style={{ position: 'relative' }}>
        <iframe
          key={muted ? 'muted' : 'unmuted'}   // remount to apply new src
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

        {/* Broadcast overlays */}
        <div className="live-bug">● EN VIVO</div>
        <div className="channel-bug">tm7</div>
        <div className="lower-third">
          JULIETA MANSILLA · ¿DÓNDE ESTÁ?
          <small>COBERTURA ESPECIAL · CASO EN DESARROLLO · TELEMIRA</small>
        </div>
        <PlayerTimestamp />

        {/* Click-to-unmute overlay */}
        {muted && (
          <div
            onClick={activateAudio}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.45)',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <div
              className="blink"
              style={{
                background: '#cc0000',
                color: '#ffff00',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: 16,
                padding: '12px 24px',
                letterSpacing: 2,
                border: '2px solid #ffcc00',
                boxShadow: '0 0 16px rgba(255,0,0,0.6)',
              }}
            >
              🔇 CLIC PARA ACTIVAR AUDIO
            </div>
          </div>
        )}
      </div>

      {/* Player bar – fullscreen via iframe's native button */}
      <div className="player-bar">
        <div
          className="pb-btn"
          onClick={() => window.open(`https://youtu.be/${VIDEO_ID}`, '_blank')}
          style={{ cursor: 'pointer', fontSize: 10 }}
          title="Ver en YouTube"
        >
          ▶ YT
        </div>
      </div>
    </>
  )
}
