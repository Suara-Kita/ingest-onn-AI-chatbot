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
      <header className="flex justify-center items-center px-6 py-5 flex-shrink-0">
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Onn <span style={{ color: 'var(--primary)' }}>AI</span>
        </h1>
      </header>

      {/* Chat area */}
      <main
        className={`flex-1 flex flex-col overflow-hidden px-4 items-center ${
          messages.length === 0 ? 'justify-center' : ''
        }`}
      >
        <div className="w-full max-w-[660px] flex flex-col flex-1 min-h-0">
          {messages.length === 0 ? (
            <EmptyState onSelect={sendMessage} />
          ) : (
            <ChatWindow messages={messages} isLoading={isLoading} />
          )}
        </div>
      </main>

      {/* Footer / input */}
      <footer className="flex flex-col items-center px-4 pb-6 flex-shrink-0">
        <div className="w-full max-w-[660px]">
          <InputBar onSend={sendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  )
}
