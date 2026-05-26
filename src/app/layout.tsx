import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TELEMIRA :: Su Ventana al Mundo desde 1994 - Sitio Oficial',
  description: 'Canal 7 — Señal en vivo, programación, concursos, noticias y más. El canal de todos. Mejor visualizado en 1024x768.',
  keywords: ['Telemira', 'canal 7', 'televisión', 'señal en vivo', 'programación', 'concursos', 'noticias'],
  openGraph: {
    title: 'TELEMIRA :: Su Ventana al Mundo desde 1994',
    description: 'Canal 7 — Señal en vivo, programación, concursos y más. El canal de todos.',
    url: 'https://telemira.tv',
    siteName: 'Telemira',
    locale: 'es_LA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'TELEMIRA :: Su Ventana al Mundo desde 1994',
    description: 'Canal 7 — Señal en vivo, programación, concursos y más.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://telemira.tv'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#001a6e" />
        <meta name="msapplication-TileColor" content="#001a6e" />
      </head>
      <body>{children}</body>
    </html>
  )
}
