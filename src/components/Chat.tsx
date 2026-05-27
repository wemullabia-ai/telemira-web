'use client'
import { useState, useEffect, useRef } from 'react'

type Msg = { type: 'sys' | 'user' | 'mod'; user?: string; text: string }

const CONVERSATIONS: Msg[][] = [

  // 1 — El clásico: drama de telenovela
  [
    { type: 'sys',  text: 'Bienvenido a la Sala #1 — sea respetuoso.' },
    { type: 'user', user: 'marielita_44',     text: 'hola desde valle alto :)' },
    { type: 'user', user: 'elGordoMira',      text: '¿alguien sabe si repiten el de ayer?' },
    { type: 'user', user: 'corazon_fan_real', text: 'DIEGO NO PUEDE MORIR' },
    { type: 'sys',  text: '— don_pancho ha entrado a la sala' },
    { type: 'user', user: 'don_pancho',       text: 'buenas noches compañeros' },
    { type: 'user', user: 'corazon_fan_real', text: 'DIEGO NO PUEDE MORIR!!!!!' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Recuerden las normas.' },
    { type: 'user', user: 'marielita_44',     text: 'ya murió en el cap 34 de la versión venezolana' },
    { type: 'user', user: 'corazon_fan_real', text: 'MENTIRA NO ACEPTO' },
    { type: 'user', user: 'elGordoMira',      text: 'se cortó la señal por acá' },
    { type: 'user', user: 'don_pancho',       text: '¿hay misa en diferido hoy?' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'No hay misa hoy don Pancho.' },
    { type: 'user', user: 'don_pancho',       text: 'gracias mod, abrazo' },
  ],

  // 2 — El sismo
  [
    { type: 'sys',  text: 'Bienvenido a la Sala #1 — sea respetuoso.' },
    { type: 'user', user: 'petrona_mira',     text: 'buenas estoy viendo el programa' },
    { type: 'user', user: 'juanki_2002',      text: 'qué aburrido está hoy' },
    { type: 'user', user: 'petrona_mira',     text: 'ay sí, la Julieta está muy seria' },
    { type: 'user', user: 'TEMBLÓ???',        text: 'TEMBLÓ???' },
    { type: 'user', user: 'juanki_2002',      text: 'TEMBLÓ???' },
    { type: 'user', user: 'petrona_mira',     text: 'TEMBLÓ???' },
    { type: 'sys',  text: '— 47 usuarios han entrado a la sala' },
    { type: 'user', user: 'sismologa_amateur',text: 'fue un 4.2 en escala richter' },
    { type: 'user', user: 'don_esteban_75',   text: 'yo lo sentí desde el baño' },
    { type: 'user', user: 'TEMBLÓ???',        text: 'YO LO SENTÍ' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Por favor no spreads de rumores.' },
    { type: 'user', user: 'sismologa_amateur',text: 'fue 3.1 me equivoqué perdón' },
    { type: 'user', user: 'juanki_2002',      text: 'tembló o no tembló definanse' },
  ],

  // 3 — Los boomers vs la tecnología
  [
    { type: 'sys',  text: 'Sala #1 — Televisión y tecnología.' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'hola hija me ayudas a mandar un mensaje' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'hija?' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'no sé si esto llega' },
    { type: 'user', user: 'elGordoMira',      text: 'sí llega señora' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'AY QUÉ MODERNO' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'en mi época el canal era solo uno y era bueno' },
    { type: 'user', user: 'juanki_2002',      text: 'ok boomer' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'qué es boomer' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'Ricardo eso es un insulto' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'jovencito le voy a decir a su madre' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Respeto entre usuarios por favor.' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'gracias moderador muy buen muchacho' },
    { type: 'user', user: 'juanki_2002',      text: 'ugh' },
  ],

  // 4 — El terraplanista
  [
    { type: 'sys',  text: 'Sala #1 — sea respetuoso o lo somos por usted.' },
    { type: 'user', user: 'payaso_truth_real', text: 'TELEMIRA OCULTA LA VERDAD' },
    { type: 'user', user: 'marielita_44',      text: 'aquí vamos...' },
    { type: 'user', user: 'payaso_truth_real', text: 'el horizonte ES PLANO. lo vi en video' },
    { type: 'user', user: 'sismologa_amateur', text: 'amigo eso es una lente gran angular' },
    { type: 'user', user: 'payaso_truth_real', text: 'EXACTO eso dijiste LENTE. todo es una LENTE' },
    { type: 'user', user: 'elGordoMira',       text: 'lógica impecable' },
    { type: 'user', user: 'payaso_truth_real', text: 'el payaso terraplanista TIENE RAZÓN' },
    { type: 'mod',  user: 'MOD_telemira',      text: 'Evite desinformación.' },
    { type: 'user', user: 'payaso_truth_real', text: 'EL MODERADOR TAMBIÉN ES PARTE DEL SISTEMA' },
    { type: 'sys',  text: '— payaso_truth_real fue desconectado por el administrador' },
    { type: 'user', user: 'marielita_44',      text: 'gracias a dios' },
    { type: 'user', user: 'elGordoMira',       text: 'nos vemos mañana payaso xD' },
  ],

  // 5 — Concurso activo
  [
    { type: 'sys',  text: 'Sala #1 — Concurso Telemira ACTIVO.' },
    { type: 'user', user: 'concursante_101',  text: 'llevo 3 horas intentando entrar al concurso' },
    { type: 'user', user: 'petrona_mira',     text: 'yo también' },
    { type: 'user', user: 'concursante_101',  text: 'dice página no disponible' },
    { type: 'user', user: 'petrona_mira',     text: 'dice lo mismo para mi' },
    { type: 'user', user: 'don_pancho',       text: 'yo gané el 98 con telemira, era otro tiempo' },
    { type: 'user', user: 'concursante_101',  text: 'qué ganó don pancho' },
    { type: 'user', user: 'don_pancho',       text: 'una licuadora. todavía funciona' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'La página del concurso estará disponible en 20 min.' },
    { type: 'user', user: 'concursante_101',  text: 'eso dijeron hace 2 horas' },
    { type: 'user', user: 'petrona_mira',     text: 'jajajaja' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Estamos trabajando en ello. Gracias por su paciencia.' },
    { type: 'user', user: 'don_pancho',       text: 'suerte a todos, la licuadora vale la pena' },
  ],

  // 6 — La interrupción de noticias
  [
    { type: 'sys',  text: 'Sala #1 — Última Hora en pantalla.' },
    { type: 'user', user: 'alertaNoticia_yy', text: 'POR QUÉ CORTARON LA TELESERIE' },
    { type: 'user', user: 'corazon_fan_real', text: 'NO PUEDE SER' },
    { type: 'user', user: 'alertaNoticia_yy', text: 'justamente en el beso!!!!' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'lo repiten después?' },
    { type: 'user', user: 'juanki_2002',      text: 'no señora no repiten' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'ESCÁNDALO' },
    { type: 'user', user: 'sismologa_amateur',text: 'la noticia sí parece importante igual' },
    { type: 'user', user: 'alertaNoticia_yy', text: 'nada es más importante que el beso de Diego' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'La teleserie se repite a las 2am.' },
    { type: 'user', user: 'corazon_fan_real', text: 'quien duerme a las 2am' },
    { type: 'user', user: 'don_pancho',       text: 'yo me quedo despierto' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'ay don Pancho qué resistencia' },
  ],

  // 7 — El debate político absurdo
  [
    { type: 'sys',  text: 'Sala #1 — La política NO es tema aquí.' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'antes los canales no tenían propaganda' },
    { type: 'user', user: 'juanki_2002',      text: 'todos los canales tienen propaganda señor' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'en mi época no' },
    { type: 'user', user: 'poetaMalhumorado', text: 'en su época tampoco había internet así que' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'el internet es el problema joven' },
    { type: 'user', user: 'juanki_2002',      text: 'usted está EN internet ahora mismo' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'mi hija me trajo acá yo no pedí nada' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Sin política en el chat.' },
    { type: 'user', user: 'poetaMalhumorado', text: 'hablar del internet es política ahora?' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Sí.' },
    { type: 'user', user: 'juanki_2002',      text: 'ok.' },
    { type: 'user', user: 'RicardoJubiladoTV',text: 'en mi época el moderador era el papá' },
  ],

  // 8 — Los fans de Julieta Mansilla
  [
    { type: 'sys',  text: 'Sala #1 — ¡Julieta en pantalla ahora!' },
    { type: 'user', user: 'fanJM_oficial',    text: 'JULIETA HERMOSA TE AMAMOS' },
    { type: 'user', user: 'fanJM_oficial',    text: 'JULIETA JULIETA JULIETA' },
    { type: 'user', user: 'marielita_44',      text: 'calmaaaaa' },
    { type: 'user', user: 'fanJM_oficial',    text: 'NO ME CALMO' },
    { type: 'user', user: 'elGordoMira',       text: 'vino a preguntar por los archivos???' },
    { type: 'user', user: 'fanJM_oficial',    text: 'SHH ESO ES SECRETO' },
    { type: 'user', user: 'NormaDelCarmen68', text: 'qué archivos?' },
    { type: 'user', user: 'fanJM_oficial',    text: '🐙🐙🐙' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'Sin spoilers.' },
    { type: 'user', user: 'fanJM_oficial',    text: 'el mod también sabe xD' },
    { type: 'mod',  user: 'MOD_telemira',     text: '.' },
    { type: 'user', user: 'marielita_44',      text: 'ohhh el mod sabe jajaja' },
  ],

  // 9 — El que se equivocó de canal
  [
    { type: 'sys',  text: 'Sala #1 — Bienvenido a Telemira.' },
    { type: 'user', user: 'perdido_en_web',   text: 'hola esto es el chat del partido?' },
    { type: 'user', user: 'juanki_2002',       text: 'qué partido' },
    { type: 'user', user: 'perdido_en_web',   text: 'el fútbol' },
    { type: 'user', user: 'marielita_44',      text: 'esto es telemira amigo, canal de cultura' },
    { type: 'user', user: 'perdido_en_web',   text: 'ah. y hay fútbol?' },
    { type: 'user', user: 'elGordoMira',       text: 'no' },
    { type: 'user', user: 'perdido_en_web',   text: 'y vamos ganando?' },
    { type: 'user', user: 'don_pancho',        text: 'amigo no hay partido' },
    { type: 'user', user: 'perdido_en_web',   text: 'ahhh igual me quedo, cómo se llama esto' },
    { type: 'user', user: 'fanJM_oficial',    text: 'telemira.tv' },
    { type: 'user', user: 'perdido_en_web',   text: 'qué bueno que se llame así, yo me llamo Mira' },
    { type: 'user', user: 'juanki_2002',       text: 'ok esto es demasiado' },
  ],

  // 10 — El experto en todo
  [
    { type: 'sys',  text: 'Sala #1 — Debate abierto.' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'en realidad la señal de este canal no es HD' },
    { type: 'user', user: 'petrona_mira',     text: 'y?' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'y eso afecta la frecuencia de onda cerebral' },
    { type: 'user', user: 'sismologa_amateur',text: 'eso no es cómo funciona' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'soy ingeniero' },
    { type: 'user', user: 'sismologa_amateur',text: 'de qué' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'de sistemas, computación, también medicina' },
    { type: 'user', user: 'juanki_2002',       text: 'o sea nada' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'tengo 3 diplomados en televisión analógica' },
    { type: 'user', user: 'petrona_mira',     text: 'eso no existe' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'en Rumanía existe' },
    { type: 'mod',  user: 'MOD_telemira',     text: 'No compartir desinformación.' },
    { type: 'user', user: 'ExpertoEnTodo',    text: 'el moderador no tiene diplomado' },
  ],
]

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [online, setOnline] = useState(23)
  const [convIdx, setConvIdx] = useState(0)
  const chatRef = useRef<HTMLDivElement>(null)
  const trickleIdx = useRef(0)

  // Pick a random conversation on mount
  useEffect(() => {
    const rand = Math.floor(Math.random() * CONVERSATIONS.length)
    setConvIdx(rand)
    setMessages(CONVERSATIONS[rand].slice(0, 7))
    trickleIdx.current = 7
  }, [])

  // Trickle remaining messages one by one
  useEffect(() => {
    if (messages.length === 0) return
    const conv = CONVERSATIONS[convIdx]

    const msgId = setInterval(() => {
      const next = conv[trickleIdx.current % conv.length]
      trickleIdx.current++
      setMessages(prev => [...prev.slice(-22), next])
    }, 5200)

    const onlineId = setInterval(() => {
      setOnline(n => {
        const next = n + Math.floor(Math.random() * 5) - 2
        return Math.max(8, Math.min(148, next))
      })
    }, 4200)

    return () => { clearInterval(msgId); clearInterval(onlineId) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convIdx])

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
