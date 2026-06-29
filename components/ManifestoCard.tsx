// components/ManifestoCard.tsx
const BULLETS = [
  'Membentuk Hala Tuju Kempen Berteraskan Akar Umbi',
  'Ketelusan Tawaran Melawan Politik Persepsi',
  'Menyatukan Suara Generasi Baharu',
]

export default function ManifestoCard() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(44,111,247,0.14)',
        borderRadius: '16px',
        padding: '28px 32px',
        boxShadow: '0 2px 12px rgba(44,111,247,0.04)',
      }}
    >
      <div
        style={{
          fontSize: '16px',
          fontWeight: 800,
          color: '#0A0F1E',
          letterSpacing: '-0.3px',
          marginBottom: '10px',
          fontFamily: 'var(--font-anybody), sans-serif',
        }}
      >
        Kenapa Sistem ini penting?
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#1A1F36',
          marginBottom: '22px',
        }}
      >
        Bergerak ke depan dengan <strong style={{ color: '#0A0F1E', fontWeight: 700 }}>pendekatan moden</strong> selari dengan zaman. Kami memanfaatkan <strong style={{ color: '#0A0F1E', fontWeight: 700 }}>A.I</strong> untuk memastikan hala tuju ini dibina berasaskan <strong style={{ color: '#0A0F1E', fontWeight: 700 }}>suara sebenar rakyat</strong> dan <strong style={{ color: '#0A0F1E', fontWeight: 700 }}>visi kemajuan yang telus</strong>.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {BULLETS.map((bullet, i) => (
          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span
              style={{
                flexShrink: 0,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2C6FF7, #5B9BFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2px',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontSize: '14px', lineHeight: 1.65, color: '#1A1F36', fontWeight: 600 }}>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
