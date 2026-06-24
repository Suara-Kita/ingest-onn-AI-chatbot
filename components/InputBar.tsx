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

  return (
    <div className="pb-2">
      <div
        className="flex items-center gap-2.5 rounded-full border pl-5 pr-2 py-2"
        style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}
      >
        <textarea
          className="flex-1 resize-none border-none outline-none bg-transparent text-sm placeholder:opacity-50 min-h-[24px] max-h-[120px] py-1.5 disabled:opacity-50"
          style={{ color: 'var(--foreground)' }}
          placeholder="Tanya sesuatu... / Ask something.."
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#0f172a' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
      <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted-foreground)' }}>
        Enter untuk hantar · Shift+Enter untuk baris baru
      </p>
    </div>
  )
}
