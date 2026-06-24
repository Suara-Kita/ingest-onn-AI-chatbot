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
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span className="text-white text-sm font-bold select-none">O</span>
        </div>
        <div>
          <h1 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
            Onn AI
          </h1>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Pembantu Kawasan Sekijang
          </p>
        </div>
      </header>

      {/* Chat area — centered, max 720px */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-[720px] w-full mx-auto">
        {messages.length === 0 ? (
          <EmptyState onSelect={sendMessage} />
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} />
        )}
        <InputBar onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
