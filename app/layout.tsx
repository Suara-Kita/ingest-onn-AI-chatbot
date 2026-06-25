// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Syne } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plus-jakarta',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Onn AI — Pembantu Kawasan Sekijang',
  description: 'Tanya soalan tentang kawasan Sekijang, program kerajaan, dan dasar Johor.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={`${plusJakarta.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
