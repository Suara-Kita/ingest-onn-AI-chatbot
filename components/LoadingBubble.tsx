// components/LoadingBubble.tsx
'use client'

import AIAvatar from './AIAvatar'

export default function LoadingBubble() {
  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
      aria-label="Loading response"
    >
      <AIAvatar />
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '12px 16px',
          borderRadius: '16px 16px 16px 4px',
          boxShadow: '0 2px 12px rgba(44,111,247,0.08)',
          border: '1px solid rgba(44,111,247,0.08)',
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        {[0, 200, 400].map((delay) => (
          <span
            key={delay}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#2C6FF7',
              display: 'inline-block',
              animation: `dot-bounce 1.2s ease-in-out infinite`,
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
