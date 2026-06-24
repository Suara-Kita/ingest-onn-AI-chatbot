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
    <div className="px-4 pt-6 pb-2 max-w-[720px] w-full mx-auto">
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingBubble />}
      <div ref={bottomRef} />
    </div>
  )
}
