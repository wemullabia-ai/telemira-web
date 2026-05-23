'use client'
import { useRef, useState } from 'react'
import PlayerTimestamp from './PlayerTimestamp'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(72)

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
          src="/uploads/presentación Canal.mp4"
          autoPlay
          playsInline
          style={{ width: '100%', display: 'block' }}
          onEnded={() => setPlaying(false)}
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
        <input
          type="range" min={0} max={100} value={volume}
          onChange={e => changeVolume(Number(e.target.value))}
          style={{ width: 60, cursor: 'pointer', verticalAlign: 'middle' }}
        />
        <span style={{ fontFamily: '"Courier New",monospace', fontSize: 10 }}>VOL {volume}%</span>
        <div className="pb-btn" onClick={fullscreen} style={{ cursor: 'pointer' }}>⛶</div>
      </div>
    </>
  )
}
