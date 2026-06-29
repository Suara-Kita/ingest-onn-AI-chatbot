// app/page.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import ManifestoCard from '@/components/ManifestoCard'
import ManifestoList from '@/components/ManifestoList'
import StatsCard from '@/components/StatsCard'
import ChatSidebar from '@/components/ChatSidebar'
import { Message } from '@/lib/types'

interface Stats {
  cases: number | null
  improvements: number | null
}

const UNAVAILABLE =
  'Maaf, sistem tidak tersedia buat masa ini. Sila cuba lagi.\n\nSorry, the system is currently unavailable. Please try again.'

export default function Home() {
  const stats: Stats = { cases: 247, improvements: 12 }
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [chatOpen])

  const sendMessage = useCallback(async (text: string) => {
    if (isLoading) return
    if (window.innerWidth <= 768) setChatOpen(true)
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(res.statusText)
      const data = (await res.json()) as { reply?: string; sources?: string[] }
      if (!data.reply) throw new Error('empty reply')
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply as string,
          timestamp: new Date(),
          sources: data.sources,
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: UNAVAILABLE, timestamp: new Date() },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

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
        <span style={{ fontFamily: 'var(--font-anybody), sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px', color: '#1A1F36' }}>
          Onn <span style={{ color: '#2C6FF7' }}>AI</span>
        </span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(44,111,247,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Beta
        </span>
      </header>

      {/* Main content */}
      <div className="main-content">
        <ManifestoCard />

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <StatsCard label="Kes Dikemukakan" value={stats.cases} sublabel="aduan rakyat diterima" />
          <StatsCard label="Penambahbaikan" value={stats.improvements} sublabel="kes diselesaikan" />
        </div>

        {/* YouTube Live */}
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(44,111,247,0.14)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(44,111,247,0.04)',
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(44,111,247,0.5)', letterSpacing: '1.8px', textTransform: 'uppercase', padding: '16px 20px 12px' }}>
            Siaran Langsung
          </div>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/t_mnJZDJ2bM?autoplay=0"
              title="YouTube Live"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>

        <ManifestoList />
      </div>

      {/* Desktop: fixed chat overlay */}
      <div
        className="desktop-chat"
        style={{
          position: 'fixed',
          top: '73px',
          right: '24px',
          width: '460px',
          height: 'calc(100dvh - 97px)',
          zIndex: 20,
        }}
      >
        <ChatSidebar messages={messages} isLoading={isLoading} onSend={sendMessage} />
      </div>

      {/* Mobile: FAB + speech bubble */}
      <div
        className="mobile-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 30,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
        }}
      >
        {/* Speech bubble */}
        {!chatOpen && (
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(44,111,247,0.18)',
              borderRadius: '16px 16px 4px 16px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#1A1F36',
              maxWidth: '200px',
              boxShadow: '0 4px 16px rgba(44,111,247,0.12)',
              animation: 'popIn 0.35s ease both',
              lineHeight: 1.4,
              cursor: 'pointer',
            }}
            onClick={() => setChatOpen(true)}
          >
            Ada soalan? Tanya saya! 👋
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Buka Onn AI"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(44,111,247,0.35)',
            flexShrink: 0,
          }}
        >
          <Image src="/onn.jpg" alt="Onn AI" width={60} height={60} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </button>
      </div>

      {/* Mobile: chat bottom sheet */}
      {chatOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(26,31,54,0.4)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setChatOpen(false)}
        >
          <div
            style={{
              width: '100%',
              height: '88dvh',
              borderRadius: '20px 20px 0 0',
              overflow: 'hidden',
              animation: 'slideUp 0.28s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Sheet header */}
            <div
              style={{
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px 12px',
                borderBottom: '1px solid rgba(44,111,247,0.08)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-anybody), sans-serif', fontSize: '15px', fontWeight: 800, color: '#1A1F36', letterSpacing: '-0.2px' }}>
                Onn <span style={{ color: '#2C6FF7' }}>AI</span>
              </span>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Tutup"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(44,111,247,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2C6FF7',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div style={{ height: 'calc(88dvh - 57px)' }}>
              <ChatSidebar
                messages={messages}
                isLoading={isLoading}
                onSend={sendMessage}
                style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
