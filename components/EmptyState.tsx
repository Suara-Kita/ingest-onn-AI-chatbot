// components/EmptyState.tsx
'use client'

const SUGGESTIONS = [
  'Apakah program bantuan untuk belia?',
  'Apa peluang pekerjaan di Johor?',
  'Bagaimana cara memohon rumah pertama?',
  'What support is available for low-income families?',
  'What is JS-SEZ and how does it affect Johor?',
  'Apakah GDP Johor 2025?',
]

interface EmptyStateProps {
  onSelect: (question: string) => void
}

export default function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 gap-10">
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span className="text-white text-2xl font-bold select-none">O</span>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Onn AI
        </h2>
        <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--muted-foreground)' }}>
          Tanya sebarang soalan tentang kawasan Sekijang, program bantuan, dan dasar Johor.
        </p>
      </div>

      <div className="w-full max-w-lg">
        <p className="text-xs text-center mb-3" style={{ color: 'var(--muted-foreground)' }}>
          Cadangan soalan
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelect(s)}
              className="text-sm px-4 py-2 rounded-full border transition-colors cursor-pointer bg-[var(--secondary)] hover:bg-[var(--accent)]"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--secondary-foreground)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
