// components/EmptyState.tsx
'use client'

import type { ReactNode } from 'react'

interface CardItem {
  icon: ReactNode
  title: string
  desc: string
  question: string
}

function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  )
}

const CARDS: CardItem[] = [
  {
    icon: <HeartIcon />,
    title: 'Program Bantuan',
    desc: 'Bantuan kewangan & sokongan rakyat',
    question: 'Apakah program bantuan untuk belia?',
  },
  {
    icon: <BriefcaseIcon />,
    title: 'Peluang Pekerjaan',
    desc: 'Kerja, gaji premium & latihan kemahiran',
    question: 'Apa peluang pekerjaan di Johor?',
  },
  {
    icon: <HomeIcon />,
    title: 'Rumah Pertama',
    desc: 'Bantuan & subsidi membeli rumah pertama',
    question: 'Bagaimana cara memohon rumah pertama?',
  },
  {
    icon: <UsersIcon />,
    title: 'Family Support',
    desc: 'Support for low-income families',
    question: 'What support is available for low-income families?',
  },
  {
    icon: <GlobeIcon />,
    title: 'JS-SEZ Johor',
    desc: "Impact on Johor's economy & jobs",
    question: 'What is JS-SEZ and how does it affect Johor?',
  },
  {
    icon: <ChartIcon />,
    title: 'GDP Johor 2025',
    desc: 'Pertumbuhan ekonomi & unjuran',
    question: 'Apakah GDP Johor 2025?',
  },
]

interface EmptyStateProps {
  onSelect: (question: string) => void
}

export default function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[660px]">
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{
            backgroundImage: 'linear-gradient(90deg, #2563eb, #60a5fa)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Hello
        </h1>
        <h2
          className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5"
          style={{ color: '#cbd5e1' }}
        >
          Apa yang anda ingin tahu tentang Sekijang hari ini?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {CARDS.map(card => (
            <button
              key={card.title}
              type="button"
              onClick={() => onSelect(card.question)}
              className="text-left rounded-2xl border p-4 cursor-pointer transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                borderColor: 'var(--border)',
                backgroundImage: 'linear-gradient(155deg, #ffffff 40%, #eff6ff)',
              }}
            >
              <span className="flex mb-10" style={{ color: 'var(--primary)' }}>
                {card.icon}
              </span>
              <div className="text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
                {card.title}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {card.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
