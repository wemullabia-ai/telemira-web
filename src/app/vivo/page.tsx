'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const RAW_VIDEOS = [
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549664/gag_mambo_lywz7c.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549534/poetas_extremos_dfbgsi.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549494/FUTBOLISTA_FRANCO_eqaytk.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549490/Luis_Facha_zasmaq.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549478/K_PAP_V2_es6kmt.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549472/pancho_puelma_junior_sksoey.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549470/Homotherian_klm6fg.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779549466/manicomio_de_plantas_li5wi9.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779548357/vr_set_for_babies_irtvli.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779548355/Shosdelacul_gdacb1.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779548356/Statusbucks_euntbj.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779548328/Profr_Fabian_corto_rmhlst.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779548314/rechilcer_qhiitf.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546771/bullyns_animal_kxsprm.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546763/escorpio_f5szqa.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546761/formertrans_amgbve.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546757/Broncooo_smx4uv.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546753/alargamiento_de_espalda_mdgqzw.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546753/Demasiado_vestidos_promo_j4ejfi.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546753/Doctores_millonarios_xjierh.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546752/cutecuernas_zkswuy.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546726/Corazon_de_alcnci%CC%81a_n7y4pj.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779546722/bozal_d70jxl.mp4',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779526448/telemira/zalo_reyes.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779525983/telemira/perkins_mujeres.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779525300/telemira/hijo.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779524748/telemira/chiguaguas.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779524704/telemira/cerebro_anime.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779524405/telemira/azotea.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779524384/telemira/arepa_franklin_1.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779524176/telemira/adam_cocina.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779523696/telemira/PATAENLOCICO.mov',
  'https://res.cloudinary.com/dlismekzd/video/upload/v1779525835/telemira/para_sonrei_r.mov',
]

// Inserta transformación de Cloudinary para reducir peso y acelerar carga
function optimizeUrl(url: string): string {
  return url.replace('/upload/', '/upload/q_auto:eco,w_1280/')
}

const VIDEOS = RAW_VIDEOS.map(optimizeUrl)

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
  const [active, setActive] = useState<'a' | 'b'>('a')
  const videoA = useRef<HTMLVideoElement>(null)
  const videoB = useRef<HTMLVideoElement>(null)

  useEffect(() => { setPlaylist(shuffle(VIDEOS)) }, [])

  const getVideo = useCallback((which: 'a' | 'b') =>
    which === 'a' ? videoA.current : videoB.current, [])

  useEffect(() => {
    if (!playlist.length) return
    const current = getVideo(active)
    const buffer = getVideo(active === 'a' ? 'b' : 'a')
    // activo: con sonido
    if (current) { current.muted = false; current.play().catch(() => {}) }
    // buffer: siempre mudo mientras precarga
    const nextIdx = (idx + 1) % playlist.length
    if (buffer) { buffer.muted = true; buffer.src = playlist[nextIdx]; buffer.load() }
  }, [idx, active, playlist, getVideo])

  const go = useCallback((dir: 1 | -1) => {
    setIdx(i => {
      const next = (i + dir + playlist.length) % playlist.length
      const nextActive = active === 'a' ? 'b' : 'a'
      const nextVideo = getVideo(nextActive)
      // asegurar mudo antes de cargar
      if (nextVideo) { nextVideo.muted = true; nextVideo.src = playlist[next]; nextVideo.load() }
      setActive(nextActive)
      return next
    })
  }, [active, playlist, getVideo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const current = playlist[idx]
  const label = current?.split('/').pop()?.replace(/\.(mp4|mov)$/, '').replace(/_[a-z0-9]{6}$/, '').replace(/_/g, ' ').toUpperCase()

  const videoStyle = (which: 'a' | 'b'): React.CSSProperties => ({
    width: '100%', display: active === which ? 'block' : 'none', maxHeight: '80vh'
  })

  return (
    <div style={{
      background: '#000', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tahoma, Arial, sans-serif'
    }}>
      <div style={{
        width: '100%', background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box'
      }}>
        <a href="/" style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: 12, textDecoration: 'none' }}>← Volver al sitio</a>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 }}>TELEMIRA — SEÑAL EN VIVO</div>

      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 960, flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', position: 'relative' }}>
          <video ref={videoA} src={playlist[0] ?? ''} autoPlay controls playsInline onEnded={() => go(1)} style={videoStyle('a')} />
          <video ref={videoB} muted controls playsInline onEnded={() => go(1)} style={videoStyle('b')} />
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#cc0000', color: '#fff', fontWeight: 'bold', fontSize: 11, padding: '2px 8px', borderRadius: 2 }}>● EN VIVO</div>
          <div style={{ position: 'absolute', top: 10, right: 10, background: '#003399', color: '#ffcc00', fontWeight: 'bold', fontSize: 11, padding: '2px 8px', borderRadius: 2, fontStyle: 'italic' }}>tm</div>
        </div>
      </div>

      <div style={{
        width: '100%', background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box'
      }}>
        <div style={{ color: '#ccc', fontSize: 10, letterSpacing: 1 }}>{label}</div>
        <div style={{ display: 'flex', gap: 20, color: '#888', fontSize: 10, letterSpacing: 1 }}>
          <span style={{ color: '#ffcc00' }}>CONTROLES:</span>
          <span>⬅ Anterior</span>
          <span>⬆⬇ Volumen</span>
          <span>➡ Siguiente</span>
          <span>ESPACIO Pausa</span>
        </div>
      </div>
    </div>
  )
}
