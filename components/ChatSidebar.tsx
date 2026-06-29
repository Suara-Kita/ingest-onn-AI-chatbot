// components/ChatSidebar.tsx
'use client'

import type { CSSProperties } from 'react'
import { Message } from '@/lib/types'
import ChatWindow from './ChatWindow'
import InputBar from './InputBar'
import EmptyState from './EmptyState'

interface ChatSidebarProps {
  messages: Message[]
  isLoading: boolean
  onSend: (text: string) => void
  style?: CSSProperties
}

export default function ChatSidebar({ messages, isLoading, onSend, style }: ChatSidebarProps) {
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
        ...style,
      }}
    >
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
          <EmptyState onSelect={onSend} />
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
        <InputBar onSend={onSend} isLoading={isLoading} />
      </div>
    </div>
  )
}
