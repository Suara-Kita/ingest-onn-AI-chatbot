// components/LoadingBubble.tsx
'use client'

export default function LoadingBubble() {
  return (
    <div className="flex justify-start mb-4" aria-label="Loading response">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <span className="text-white text-xs font-bold select-none">O</span>
      </div>
      <div
        className="rounded-2xl rounded-tl-sm px-4 py-3 border shadow-sm"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex gap-1.5 items-center h-5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: 'var(--muted-foreground)',
                opacity: 0.4,
                animationDelay: `${delay}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
