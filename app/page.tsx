// app/page.tsx
'use client'

import { useState, useCallback } from 'react'
import { Message } from '@/lib/types'
import ChatWindow from '@/components/ChatWindow'
import InputBar from '@/components/InputBar'
import EmptyState from '@/components/EmptyState'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text: string) => {
    if (isLoading) return
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = (await res.json()) as { reply?: string; sources?: string[] }
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply ?? '',
          timestamp: new Date(),
          sources: data.sources,
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Maaf, sistem tidak tersedia buat masa ini. Sila cuba lagi.\n\nSorry, the system is currently unavailable. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen" style={{ height: '100dvh', background: 'var(--background)', fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif', color: 'var(--foreground)' }}>

      {/* Header */}
      <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid rgba(44,111,247,0.1)' }}>
        <span style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px', color: '#1A1F36' }}>
          Onn <span style={{ color: '#2C6FF7' }}>AI</span>
        </span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(44,111,247,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Beta
        </span>
      </header>

      {/* Messages / empty state — single scroll owner */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(44,111,247,0.2) transparent',
        }}
      >
        {messages.length === 0 ? (
          <EmptyState onSelect={sendMessage} />
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} />
        )}
      </div>

      {/* Input area */}
      <div style={{ flexShrink: 0, padding: '16px 24px', paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>

    </div>
  )
}
