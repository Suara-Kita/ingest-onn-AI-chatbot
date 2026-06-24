// components/InputBar.tsx
'use client'

import { useState, KeyboardEvent } from 'react'

interface InputBarProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function InputBar({ onSend, isLoading }: InputBarProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const hasValue = value.trim().length > 0

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          background: '#fff',
          border: '1px solid rgba(44,111,247,0.18)',
          borderRadius: '16px',
          padding: '10px 10px 10px 18px',
          boxShadow: '0 2px 12px rgba(44,111,247,0.06)',
          transition: 'border-color 0.2s',
        }}
      >
        <textarea
          placeholder="Message Onn AI…"
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#1A1F36',
            resize: 'none',
            lineHeight: 1.6,
            maxHeight: '140px',
            overflowY: 'auto',
            padding: '4px 0',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(44,111,247,0.2) transparent',
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!hasValue || isLoading}
          aria-label="Send message"
          style={{
            flexShrink: 0,
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2C6FF7, #5B9BFF)',
            border: 'none',
            cursor: hasValue && !isLoading ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hasValue && !isLoading ? 1 : 0.4,
            transition: 'opacity 0.2s, transform 0.15s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(44,80,160,0.3)', marginTop: '10px', fontWeight: 400 }}>
        Onn AI can make mistakes. Use your judgment.
      </p>
    </div>
  )
}
