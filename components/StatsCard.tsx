// components/StatsCard.tsx

interface StatsCardProps {
  label: string
  value: number | null
  sublabel: string
}

export default function StatsCard({ label, value, sublabel }: StatsCardProps) {
  return (
    <div
      className="stats-card"
      style={{
        background: '#fff',
        border: '1px solid rgba(44,111,247,0.14)',
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: '0 2px 12px rgba(44,111,247,0.04)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 800,
          color: '#0A0F1E',
          letterSpacing: '-0.2px',
          marginBottom: '12px',
          fontFamily: 'var(--font-anybody), sans-serif',
        }}
      >
        {label}
      </div>
      <div
        className="stats-value"
        style={{
          fontSize: '52px',
          fontWeight: 800,
          fontFamily: 'var(--font-anybody), sans-serif',
          color: '#1A1F36',
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        {value === null ? (
          <span style={{ fontSize: '32px', opacity: 0.25 }}>—</span>
        ) : (
          value.toLocaleString('ms-MY')
        )}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(44,80,160,0.4)', marginTop: '8px', fontWeight: 400 }}>
        {sublabel}
      </div>
    </div>
  )
}
