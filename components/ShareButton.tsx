"use client";

import { useState } from "react";

const SHARE_DATA = {
  title: "Onn, Tanya Apa Khabar?",
  text: "Jangan 'spin' media sosial kelirukan kita. Jom semak Kad Laporan 2022-2026 & 63 Tekad Manifesto BN Johor secara real-time dengan Onn (Beta Test) di sini:",
  url: "https://onnai.sekijang-ai.xyz/",
};

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share(SHARE_DATA);
      } catch {
        // user cancelled — ignore
      }
      return;
    }
    await navigator.clipboard.writeText(SHARE_DATA.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 22px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, #2C6FF7, #5B9BFF)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 600,
        fontFamily: "var(--font-anybody), sans-serif",
        letterSpacing: "0.3px",
        boxShadow: "0 2px 10px rgba(44,111,247,0.25)",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "Disalin!" : "Kongsi"}
    </button>
  );
}
