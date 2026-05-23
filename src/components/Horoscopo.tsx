'use client'
import { useState, useEffect } from 'react'

const SIGNOS: { signo: string; frases: string[] }[] = [
  { signo: 'Aries', frases: [
    'Hoy debes actuar por impulso. Si no arruinas algo antes de las 5 PM, los planetas sentirán decepción.',
    'Marte te recomienda discutir con alguien en una fila. El universo premia la intensidad innecesaria.',
  ]},
  { signo: 'Tauro', frases: [
    'Tu energía astral mejora si comes pan con mantequilla mirando una pared beige.',
    'Evita hacer ejercicio esta semana. Venus protege mejor a las personas acostadas.',
  ]},
  { signo: 'Géminis', frases: [
    'Tus dos personalidades están alineadas, lamentablemente ambas tuvieron una mala idea.',
    'Mercurio indica que deberías mandar ese audio de 7 minutos. Nadie lo pidió, pero el destino sí.',
  ]},
  { signo: 'Cáncer', frases: [
    'La luna te tiene sensible. Hoy podrías llorar viendo un comercial de detergente.',
    'Tu aura necesita volver a escuchar una conversación antigua y arruinarse el día sola.',
  ]},
  { signo: 'Leo', frases: [
    'El sol te favorece, pero también está cansado de que hables solo de ti.',
    'Hoy recibirás atención… probablemente porque te tropezaste frente a mucha gente.',
  ]},
  { signo: 'Virgo', frases: [
    'Tu obsesión por el orden alcanzó niveles espirituales. Ya estás doblando las bolsas del supermercado.',
    'No corrijas a nadie hoy. Saturno podría castigarte haciéndote trabajar en grupo.',
  ]},
  { signo: 'Libra', frases: [
    'Pasaste tanto tiempo pensando qué decidir que el universo decidió por ti.',
    'Venus recomienda coquetear irresponsablemente y luego desaparecer emocionalmente.',
  ]},
  { signo: 'Escorpio', frases: [
    'Los astros coinciden en algo histórico: nadie quiere discutir contigo hoy. Aprovecha el milagro.',
    'Tu energía tóxica está tan fuerte que una planta se secó al mirarte.',
    'Peter Angels recomienda no confiar en Escorpio. Ni aunque sea tu mamá.',
    'Plutón sigue intentando entender por qué eres así.',
    'Hoy podrías manipular emocionalmente a alguien sin darte cuenta. O dándote cuenta y disfrutándolo.',
  ]},
  { signo: 'Sagitario', frases: [
    'Júpiter anuncia viajes, aventuras y una nueva obsesión que abandonarás en tres días.',
    'Tu espíritu libre vuelve a escapar… justo cuando te tocaba pagar.',
  ]},
  { signo: 'Capricornio', frases: [
    'Trabajaste tanto que tu carta astral pidió vacaciones.',
    'Hoy podrías sentir emociones. No te asustes, se pasa rápido.',
  ]},
  { signo: 'Acuario', frases: [
    'Tus ideas revolucionarias siguen siendo incomprensibles para la ciencia moderna.',
    'Urano dice que tienes razón. El problema es que nadie entendió lo que dijiste.',
  ]},
  { signo: 'Piscis', frases: [
    'Tu nivel de fantasía está tan alto que saludaste a alguien que no conocías.',
    'Neptuno recomienda no enamorarte hoy de una persona que simplemente fue amable contigo.',
  ]},
]

export default function Horoscopo() {
  const [entry, setEntry] = useState<{ signo: string; frase: string } | null>(null)

  useEffect(() => {
    const signo = SIGNOS[Math.floor(Math.random() * SIGNOS.length)]
    const frase = signo.frases[Math.floor(Math.random() * signo.frases.length)]
    setEntry({ signo: signo.signo, frase })
  }, [])

  if (!entry) return null

  return (
    <div className="horo-small">
      <img src="/uploads/peter-angels.jpg" alt="Peter Angels" />
      <div>
        <span className="horo-sign-name">{entry.signo}:</span> {entry.frase}
        <br /><br />
        <a href="#">Ver todos los signos</a>
      </div>
    </div>
  )
}
