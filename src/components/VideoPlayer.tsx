'use client'
import { useRef, useState } from 'react'
import PlayerTimestamp from './PlayerTimestamp'

const SRC = 'https://res.cloudinary.com/dlismekzd/video/upload/q_auto:eco,w_1280/v1779548389/presentacio%CC%81n_Canal_vo9dsf.mp4'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(72)

  const activateAudio = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.volume = volume / 100
    setMuted(false)
  }

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(false)
  }

  const changeVolume = (val: number) => {
    setVolume(val)
    if (videoRef.current) videoRef.current.volume = val / 100
  }

  const fullscreen = () => {
    const v = videoRef.current
    if (!v) return
    if (document.fullscreenElement) document.exitFullscreen()
    else v.requestFullscreen()
  }

  return (
    <>
      <div className="player">
        <video
          ref={videoRef}
          src={SRC}
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
          style={{ width: '100%', display: 'block' }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="live-bug">● EN VIVO</div>
        <div className="channel-bug">tm7</div>
        <div className="lower-third">
          JULIETA MASILLA · ¿DÓNDE ESTÁ?
          <small>COBERTURA ESPECIAL · CASO EN DESARROLLO · TELEMIRA</small>
        </div>
        <PlayerTimestamp />
      </div>
      <div className="player-bar">
        <div className="pb-btn" onClick={toggle} style={{ cursor: 'pointer' }}>{playing ? '‖' : '▶'}</div>
        <div className="pb-btn" onClick={stop} style={{ cursor: 'pointer' }}>■</div>
        {muted ? (
          <div className="pb-btn blink" onClick={activateAudio} style={{ cursor: 'pointer', color: '#ffcc00', fontSize: 9, padding: '0 6px' }}>
            🔇 ACTIVAR AUDIO
          </div>
        ) : (
          <>
            <input
              type="range" min={0} max={100} value={volume}
              onChange={e => changeVolume(Number(e.target.value))}
              style={{ width: 60, cursor: 'pointer', verticalAlign: 'middle' }}
            />
            <span style={{ fontFamily: '"Courier New",monospace', fontSize: 10 }}>VOL {volume}%</span>
          </>
        )}
        <div className="pb-btn" onClick={fullscreen} style={{ cursor: 'pointer' }}>⛶</div>
      </div>
    </>
  )
}
