"use client";

import { useState } from "react";

// components/SupportShare.tsx
const LINKS = [
  {
    label: "Share Website Ini",
    description:
      "Hab digital mendengar suara akar umbi dan menyediakan akses fakta yang telus untuk PRN Johor",
    button: "Share",
    url: "https://onnai.sekijang-ai.xyz/",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
      </svg>
    ),
    color: "#002B7F", // Ditukar kepada Biru Gelap (Tema BN) supaya kontra dengan butang YouTube Merah
  },
  {
    label: "YouTube Live",
    description:
      "Tanya lah Onn tentang fakta Manifesto PRN Johor & Kad Laporan Johor",
    button: "Subscribe",
    url: "https://www.youtube.com/live/kmDQjGR-pGE",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "#FF0000",
  },
  {
    label: "Onn, tanya apa khabar?",
    description:
      "Jom berkenalan dan sembang dgn Onn. Sembang secara 100% rahsia (anon).",
    button: "Telegram",
    url: "https://t.me/onn_line_bot",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
      </svg>
    ),
    color: "#0088CC",
  },
];

export default function SupportShare() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  async function handleShare(link: (typeof LINKS)[number]) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: link.label,
          text: `${link.description}\n\n${link.url}`,
        });
      } catch {
        // user cancelled
      }
      return;
    }
    await navigator.clipboard.writeText(link.url);
    setCopiedLabel(link.label);
    setTimeout(() => setCopiedLabel(null), 2000);
  }

  return (
    <div
      style={{
        background: "linear-gradient(to left, #f2fcfe, #cce0eb)",
        border: "1px solid rgba(44,111,247,0.2)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(44,111,247,0.04)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 800,
            fontFamily: "var(--font-anybody), sans-serif",
            color: "#1A1F36",
            letterSpacing: "-0.3px",
          }}
        >
          Support kami dengan share
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {LINKS.map((link) => (
          <div
            key={link.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "24px 18px",
              borderRadius: "12px",
              border: "1px solid #000",
              flex: "1 1 0",
              minWidth: "160px",
              justifyContent: "space-between",
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ color: link.color, flexShrink: 0 }}>
                {link.icon}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1A1F36",
                }}
              >
                {link.label}
              </div>
            </div>
            {link.description && (
              <div
                style={{
                  fontSize: "14px",
                  color: "#000",
                }}
              >
                {link.description}
              </div>
            )}
            <button
              onClick={() => handleShare(link)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #2C6FF7, #5B9BFF)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "13px",
                padding: "10px 20px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                marginTop: "auto",
              }}
            >
              {copiedLabel === link.label ? "Disalin!" : link.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
