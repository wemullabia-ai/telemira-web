'use client'
import { useState, useEffect, useRef } from 'react'

type Msg = { type: 'sys' | 'user' | 'mod'; user?: string; text: string }

const INITIAL: Msg[] = [
  { type: 'sys', text: 'Bienvenido a la Sala #1 — sea respetuoso.' },
  { type: 'user', user: 'marielita_44', text: 'hola desde valle alto :)' },
  { type: 'user', user: 'elGordoMira', text: '¿alguien sabe si repiten el de ayer?' },
  { type: 'user', user: 'corazon_fan_real', text: 'DIEGO NO PUEDE MORIR' },
  { type: 'sys', text: '— don_pancho ha entrado a la sala' },
  { type: 'user', user: 'don_pancho', text: 'buenas noches compañeros' },
  { type: 'mod', user: 'MOD_telemira', text: 'Recuerden las normas.' },
]

const TRICKLE: Msg[] = [
  { type: 'user', user: 'don_pancho', text: '¿hay misa en diferido hoy?' },
  { type: 'user', user: 'elGordoMira', text: 'se cortó la señal por acá' },
  { type: 'user', user: 'corazon_fan_real', text: 'vamos diego vamos diego' },
  { type: 'sys', text: '— maribel_z se ha conectado' },
  { type: 'user', user: 'maribel_z', text: 'hola, saludos desde costa mira' },
  { type: 'mod', user: 'MOD_telemira', text: 'No compartir datos personales.' },
  { type: 'user', user: 'don_pancho', text: 'gracias mod, abrazo' },
  { type: 'user', user: 'marielita_44', text: 'volví, se me fue la luz' },
  { type: 'user', user: 'poeta_extremo_77', text: 'yo participé y fue todo falso' },
  { type: 'sys', text: '— poeta_extremo_77 fue desconectado por el administrador' },
]

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL)
  const [online, setOnline] = useState(23)
  const chatRef = useRef<HTMLDivElement>(null)
  const trickleIdx = useRef(0)

  useEffect(() => {
    const msgId = setInterval(() => {
      const msg = TRICKLE[trickleIdx.current % TRICKLE.length]
      trickleIdx.current++
      setMessages(prev => [...prev.slice(-20), msg])
    }, 5200)

    const onlineId = setInterval(() => {
      setOnline(n => {
        const next = n + Math.floor(Math.random() * 5) - 2
        return Math.max(8, Math.min(74, next))
      })
    }, 4200)

    return () => { clearInterval(msgId); clearInterval(onlineId) }
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  return (
    <div className="box">
      <h3>Chat Telemira</h3>
      <div className="chat-wrap">
        <div className="chat-online">Usuarios conectados: <b style={{ color: '#cc0000' }}>{online}</b></div>
        <div className="chat" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={m.type === 'sys' ? 'sys' : ''}>
              {m.type !== 'sys' && (
                <span className={'u' + (m.type === 'mod' ? ' red' : '')}>{m.user}:</span>
              )}{' '}
              {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Escriba su mensaje..." readOnly />
          <button>Enviar</button>
        </div>
      </div>
    </div>
  )
}
