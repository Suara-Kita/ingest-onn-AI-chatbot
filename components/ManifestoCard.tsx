// components/ManifestoCard.tsx
const BULLETS = [
  'Mewujudkan 200,000 peluang pekerjaan berkualiti termasuk 100,000 pekerjaan berpendapatan premium untuk anak Johor',
  'Kelulusan lesen perniagaan dalam 24 jam dan transformasi sistem penyampaian kerajaan melalui pendigitalan menyeluruh',
  'RM100 juta dana pendidikan dan 1,000 unit rumah mampu bayar untuk orang muda Johor di bawah 35 tahun',
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
          fontSize: '10px',
          fontWeight: 600,
          color: 'rgba(44,111,247,0.5)',
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        Manifesto BN Sekijang
      </div>
      <div
        style={{
          fontSize: '22px',
          fontWeight: 800,
          fontFamily: 'var(--font-anybody), sans-serif',
          color: '#1A1F36',
          marginBottom: '22px',
          letterSpacing: '-0.5px',
        }}
      >
        Kenapa <span style={{ color: '#2C6FF7' }}>BN</span>?
      </div>
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
            <span style={{ fontSize: '14px', lineHeight: 1.65, color: '#1A1F36' }}>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
