// components/EmptyState.tsx
"use client";

import type { ReactNode } from "react";

interface CardItem {
  icon: ReactNode;
  title: string;
  desc: string;
  question: string;
}

function ManifestoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
}

const CARDS: CardItem[] = [
  {
    icon: <ManifestoIcon />,
    title: "Manifesto PRN 2026",
    desc: "Janji & hala tuju BN untuk Johor",
    question: "Apakah kandungan manifesto BN Johor?",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Peluang Pekerjaan",
    desc: "Kerja, gaji premium & latihan kemahiran",
    question: "Apa peluang pekerjaan di Johor?",
  },
  {
    icon: <HomeIcon />,
    title: "Rumah Pertama",
    desc: "Bantuan & subsidi membeli rumah pertama",
    question: "Bagaimana cara memohon rumah pertama?",
  },
  {
    icon: <UsersIcon />,
    title: "Sokongan Keluarga",
    desc: "Sokongan untuk keluarga berpendapatan rendah",
    question: "Apakah sokongan untuk keluarga berpendapatan rendah?",
  },
  {
    icon: <GlobeIcon />,
    title: "JS-SEZ Johor",
    desc: "Kesan kepada ekonomi & pekerjaan Johor",
    question: "Apa itu JS-SEZ dan bagaimana ia mempengaruhi Johor?",
  },
  {
    icon: <ChartIcon />,
    title: "GDP Johor 2025",
    desc: "Pertumbuhan ekonomi & unjuran",
    question: "Apakah GDP Johor 2025?",
  },
];

interface EmptyStateProps {
  onSelect: (question: string) => void;
}

export default function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <div
      className="animate-fade-up"
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      {/* Heading */}
      <p
        style={{
          fontFamily: "var(--font-anybody), sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#1A1F36",
          marginBottom: "8px",
          letterSpacing: "-0.5px",
          textAlign: "center",
        }}
      >
        Apa yang boleh saya bantu?
      </p>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(44,80,160,0.45)",
          fontWeight: 400,
          textAlign: "center",
          whiteSpace: "nowrap",
          lineHeight: 1.6,
          marginBottom: "40px",
        }}
      >
        Tanya apa sahaja tentang Johor. Saya Onn AI — pembantu anda.
      </p>

      {/* Suggestion cards */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {CARDS.map((card) => (
          <button
            key={card.title}
            type="button"
            onClick={() => onSelect(card.question)}
            className="card-btn"
            style={{
              textAlign: "left",
              background: "#ffffff",
              border: "1px solid rgba(44,111,247,0.14)",
              borderRadius: "12px",
              padding: "14px 16px 16px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "flex",
                marginBottom: "12px",
                color: "#2C6FF7",
              }}
            >
              {card.icon}
            </span>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#1A1F36",
                marginBottom: "4px",
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: "11px",
                lineHeight: 1.5,
                color: "rgba(44,80,160,0.5)",
              }}
            >
              {card.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
