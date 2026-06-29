// components/ManifestoList.tsx
import manifesto from '@/lib/manifesto.json'

interface ManifestoItem { teras: string; tajuk: string; konten: string[] }
const items = manifesto as ManifestoItem[]

const PILLARS = [
  {
    teras: 'Tadbir Urus Kerajaan',
    short: 'Tadbir Urus',
    highlights: ['Kelulusan lesen dalam 24 jam', 'Pendigitalan perkhidmatan kerajaan', 'Johor Super Lane di 16 PBT'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
      </svg>
    ),
  },
  {
    teras: 'Pembangunan Ekonomi',
    short: 'Ekonomi',
    highlights: ['RM260B KDNK Johor 2030', '200,000 peluang pekerjaan', 'RM100M pembiayaan mikro'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    ),
  },
  {
    teras: 'Kemudahan dan Keperluan Asas',
    short: 'Keperluan Asas',
    highlights: ['10,000 lampu jalan baharu', 'WiFi Premium di seluruh Johor', 'Pengangkutan awam bersepadu'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    teras: 'Keselamatan, Kebersihan dan Kelestarian Alam Sekitar',
    short: 'Alam Sekitar',
    highlights: ['1,245 pengecas EV 2030', 'Smart CCTV di 16 PBT', 'Pemulihan 3 sungai utama'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    teras: 'Orang Muda Johor',
    short: 'Orang Muda',
    highlights: ['RM100M dana pendidikan', '1,000 unit rumah belia', 'Subsidi RM200 lesen memandu'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function ManifestoList() {
  const counts = PILLARS.map(p => items.filter(i => i.teras === p.teras).length)

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(44,111,247,0.14)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(44,111,247,0.04)',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(44,111,247,0.5)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '4px' }}>
          Manifesto BN Johor
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-anybody), sans-serif', color: '#1A1F36', letterSpacing: '-0.3px' }}>
          5 Teras Utama
        </div>
      </div>

      <div className="manifesto-grid">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.teras}
            style={{
              borderRadius: '12px',
              padding: '14px',
              border: '1px solid rgba(44,111,247,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#2C6FF7' }}>{pillar.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(44,80,160,0.4)' }}>
                {counts[i]}
              </span>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A1F36', lineHeight: 1.3 }}>
              {pillar.short}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {pillar.highlights.map((h, hi) => (
                <div key={hi} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(44,111,247,0.35)', flexShrink: 0, marginTop: '5px' }} />
                  <span style={{ fontSize: '10px', lineHeight: 1.4, color: 'rgba(44,80,160,0.55)', wordBreak: 'break-word', minWidth: 0 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
