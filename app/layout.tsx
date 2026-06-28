// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Anybody, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plus-jakarta',
})

const anybody = Anybody({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-anybody',
  axes: ['wdth'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Onn AI — Pembantu Kawasan Sekijang',
  description: 'Tanya soalan tentang kawasan Sekijang, program kerajaan, dan dasar Johor.',
  icons: {
    icon: '/onn.jpg',
    apple: '/onn.jpg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={`${plusJakarta.variable} ${anybody.variable}`}>
      <body>{children}</body>
    </html>
  )
}
