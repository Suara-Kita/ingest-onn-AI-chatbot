// components/ChatWindow.tsx
'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/lib/types'
import MessageBubble from './MessageBubble'
import LoadingBubble from './LoadingBubble'

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isLoading])

  return (
    <div style={{ maxWidth: '720px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px 24px 8px' }}>
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingBubble />}
      <div ref={bottomRef} />
    </div>
  )
}
