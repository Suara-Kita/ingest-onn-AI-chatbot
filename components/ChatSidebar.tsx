// components/ChatSidebar.tsx
'use client'

import { useState, useCallback } from 'react'
import { Message } from '@/lib/types'
import ChatWindow from './ChatWindow'
import InputBar from './InputBar'
import EmptyState from './EmptyState'

const UNAVAILABLE =
  'Maaf, sistem tidak tersedia buat masa ini. Sila cuba lagi.\n\nSorry, the system is currently unavailable. Please try again.'

export default function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text: string) => {
    if (isLoading) return
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
        { id: crypto.randomUUID(), role: 'assistant', content: UNAVAILABLE, timestamp: new Date() },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#fff',
        border: '1px solid rgba(44,111,247,0.14)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(44,111,247,0.07)',
      }}
    >
      {/* Chat header */}
      <div
        style={{
          flexShrink: 0,
          padding: '16px 20px',
          borderBottom: '1px solid rgba(44,111,247,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-anybody), sans-serif',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '-0.2px',
            color: '#1A1F36',
          }}
        >
          Onn <span style={{ color: '#2C6FF7' }}>AI</span>
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: 'rgba(44,111,247,0.45)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          Beta
        </span>
      </div>

      {/* Messages / empty state */}
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

      {/* Input */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 16px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          borderTop: '1px solid rgba(44,111,247,0.06)',
        }}
      >
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
