import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TELEMIRA :: Su Ventana al Mundo desde 1994 - Sitio Oficial',
  description: 'Sitio oficial de Telemira. Noticias, programacion, concursos, horoscopo y mas. Mejor visualizado en 1024x768.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
