// components/ManifestoCard.tsx
const BULLETS = [
  "Membentuk hala tuju negeri berteraskan akar umbi",
  "Ketelusan manifesto dan kad laporan tanpa manipulasi",
  "Mendengar suara generasi baharu",
];

export default function ManifestoCard() {
  return (
    <div
      style={{
        background: "linear-gradient(to left, #f2fcfe, #cce0eb)",
        borderRadius: "16px",
        padding: "28px 80px",
        boxShadow: "0 2px 12px rgba(44,111,247,0.04)",
        color: "#fff",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: 800,
          color: "#2C6FF7",
          letterSpacing: "-0.3px",
          marginBottom: "10px",
          fontFamily: "var(--font-anybody), sans-serif",
        }}
      >
        Kenapa gunakan A.I untuk mendengar suara rakyat?
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {BULLETS.map((bullet, i) => (
          <li
            key={i}
            style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2C6FF7, #5B9BFF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2 2 4-4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontSize: "24px",
                lineHeight: 1.5,
                color: "#000",
                fontWeight: 600,
              }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
