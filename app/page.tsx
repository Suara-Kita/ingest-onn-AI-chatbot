// app/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import ManifestoCard from "@/components/ManifestoCard";
import ManifestoList from "@/components/ManifestoList";
import StatsCard from "@/components/StatsCard";
import ChatSidebar from "@/components/ChatSidebar";
import ShareButton from "@/components/ShareButton";
import SupportShare from "@/components/SupportShare";
import { Message } from "@/lib/types";

interface Stats {
  questions: number | null;
  maklumBalas: number | null;
}

const UNAVAILABLE =
  "Maaf, sistem tidak tersedia buat masa ini. Sila cuba lagi.\n\nSorry, the system is currently unavailable. Please try again.";

function toYouTubeEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    // Already an embed URL
    if (u.pathname.startsWith("/embed/")) return url;
    // youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be")
      return `https://www.youtube.com/embed${u.pathname}`;
    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    // youtube.com/live/VIDEO_ID
    if (u.pathname.startsWith("/live/"))
      return `https://www.youtube.com/embed/${u.pathname.slice("/live/".length)}`;
  } catch {}
  // Treat as bare video ID
  return `https://www.youtube.com/embed/${url}`;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ questions: null, maklumBalas: null });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/stats', { signal: controller.signal })
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {})
    return () => controller.abort()
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [chatOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (isLoading) return;
      if (window.innerWidth <= 768) setChatOpen(true);
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = (await res.json()) as {
          reply?: string;
          sources?: string[];
        };
        if (!data.reply) throw new Error("empty reply");
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.reply as string,
            timestamp: new Date(),
            sources: data.sources,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: UNAVAILABLE,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--background)",
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 32px",
          borderBottom: "1px solid rgba(44,111,247,0.1)",
          background: "rgba(245,248,255,0.9)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-anybody), sans-serif",
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "-0.3px",
            color: "#1A1F36",
          }}
        >
          Onn <span style={{ color: "#2C6FF7" }}>AI</span>
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "rgba(44,111,247,0.4)",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Beta
        </span>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/*<div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "18px",
          }}
        >
          <ShareButton />
        </div>*/}
        <SupportShare />

        <ManifestoCard />

        {/* YouTube Live */}
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(44,111,247,0.14)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(44,111,247,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 20px 12px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#FF0000",
                boxShadow: "0 0 0 0 rgba(255,0,0,0.7)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "rgba(44,111,247,1)",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
              }}
            >
              Tanyalah Onn
            </span>
          </div>
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={toYouTubeEmbedUrl(
                process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL ?? "yxslO3T3Hb4",
              )}
              title="YouTube Live"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
          <a
            href={process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL ?? "https://www.youtube.com/watch?v=yxslO3T3Hb4"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 20px",
              background: "#FF0000",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Pergi ke Youtube Live kami untuk bertanya kepada Onn
          </a>
        </div>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <StatsCard
            label="Maklum Balas Disalurkan"
            value={stats.maklumBalas}
            sublabel="disalurkan"
          />
          <StatsCard
            label="Soalan yang diajukan"
            value={stats.questions}
            sublabel="soalan"
          />
        </div>

        {/* Telegram CTA */}
        <div
          style={{
            position: "relative",
            maxWidth: "66%",
            margin: "0 auto",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(44,111,247,0.14)",
            boxShadow: "0 2px 12px rgba(44,111,247,0.04)",
            aspectRatio: "1280 / 725",
          }}
        >
          <Image
            src="/onn-tanya.jpg"
            alt="Onn, tanya apa khabar?"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "24px",
              right: "24px",
            }}
          >
            <a
              href="https://t.me/onn_line_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #2C6FF7, #5B9BFF)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "16px",
                padding: "11px 20px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              Sembang dengan Onn melalui Aplikasi Telegram
            </a>
          </div>
        </div>

        <ManifestoList />
      </div>

      {/* Desktop: fixed chat overlay */}
      <div
        className="desktop-chat"
        style={{
          position: "fixed",
          top: "73px",
          right: "24px",
          width: "460px",
          height: "calc(100dvh - 97px)",
          zIndex: 20,
        }}
      >
        <ChatSidebar
          messages={messages}
          isLoading={isLoading}
          onSend={sendMessage}
        />
      </div>

      {/* Mobile: FAB + speech bubble */}
      <div
        className="mobile-fab"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 30,
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        {/* Speech bubble */}
        {!chatOpen && (
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(44,111,247,0.18)",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#1A1F36",
              maxWidth: "200px",
              boxShadow: "0 4px 16px rgba(44,111,247,0.12)",
              animation: "popIn 0.35s ease both",
              lineHeight: 1.4,
              cursor: "pointer",
            }}
            onClick={() => setChatOpen(true)}
          >
            Ada soalan? Tanya saya! 👋
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Buka Onn AI"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            padding: 0,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(44,111,247,0.35)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/onn.jpg"
            alt="Onn AI"
            width={60}
            height={60}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </button>
      </div>

      {/* Mobile: chat bottom sheet */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(26,31,54,0.4)",
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setChatOpen(false)}
        >
          <div
            style={{
              width: "100%",
              height: "88dvh",
              borderRadius: "20px 20px 0 0",
              overflow: "hidden",
              animation: "slideUp 0.28s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet header */}
            <div
              style={{
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px 12px",
                borderBottom: "1px solid rgba(44,111,247,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-anybody), sans-serif",
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#1A1F36",
                  letterSpacing: "-0.2px",
                }}
              >
                Onn <span style={{ color: "#2C6FF7" }}>AI</span>
              </span>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Tutup"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(44,111,247,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2C6FF7",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div style={{ height: "calc(88dvh - 57px)" }}>
              <ChatSidebar
                messages={messages}
                isLoading={isLoading}
                onSend={sendMessage}
                style={{ borderRadius: 0, border: "none", boxShadow: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
