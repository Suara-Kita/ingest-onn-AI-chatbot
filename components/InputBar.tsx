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
    <div className="border-t px-4 py-4" style={{ borderColor: 'var(--border)' }}>
      <div className="flex gap-3 items-end">
        <textarea
          className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm placeholder:opacity-50 focus:outline-none min-h-[48px] max-h-[160px] disabled:opacity-50"
          style={{
            borderColor: 'var(--input)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
          placeholder="Taip soalan anda... / Type your question..."
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
      <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted-foreground)' }}>
        Enter untuk hantar · Shift+Enter untuk baris baru
      </p>
    </div>
  )
}
