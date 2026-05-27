import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Somos Telemira, tu canal pluralista.',
  description: 'Cuando la realidad supera a la IA',
  keywords: ['Telemira', 'canal 7', 'televisión', 'señal en vivo', 'programación', 'concursos', 'noticias'],
  openGraph: {
    title: 'Somos Telemira, tu canal pluralista.',
    description: 'Cuando la realidad supera a la IA',
    url: 'https://telemira.tv',
    siteName: 'Telemira',
    images: [{ url: '/icon.png', width: 512, height: 512, alt: 'Telemira Logo' }],
    locale: 'es_LA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Somos Telemira, tu canal pluralista.',
    description: 'Cuando la realidad supera a la IA',
    images: ['/icon.png'],
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
