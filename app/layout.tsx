// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter-variable' })

export const metadata: Metadata = {
  title: 'Onn AI — Pembantu Kawasan Sekijang',
  description: 'Tanya soalan tentang kawasan Sekijang, program kerajaan, dan dasar Johor.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
