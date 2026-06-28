// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import ManifestoCard from '@/components/ManifestoCard'
import StatsCard from '@/components/StatsCard'
import ChatSidebar from '@/components/ChatSidebar'

interface Stats {
  cases: number | null
  improvements: number | null
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ cases: null, improvements: null })

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then((data: Stats) => setStats(data))
      .catch(() => {})
  }, [])

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--background)',
        fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif',
        color: 'var(--foreground)',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 32px',
          borderBottom: '1px solid rgba(44,111,247,0.1)',
          background: 'rgba(245,248,255,0.9)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-anybody), sans-serif',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.3px',
            color: '#1A1F36',
          }}
        >
          Onn <span style={{ color: '#2C6FF7' }}>AI</span>
        </span>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(44,111,247,0.4)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          Beta
        </span>
      </header>

      {/* Two-column layout */}
      <div className="page-grid" style={{ padding: '28px 32px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Left: scrollable content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ManifestoCard />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <StatsCard
              label="Kes Dikemukakan"
              value={stats.cases}
              sublabel="aduan rakyat diterima"
            />
            <StatsCard
              label="Penambahbaikan"
              value={stats.improvements}
              sublabel="kes diselesaikan"
            />
          </div>
        </div>

        {/* Right: sticky chatbot */}
        <div className="chat-sticky">
          <ChatSidebar />
        </div>

      </div>
    </div>
  )
}
