// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Anybody, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plus-jakarta",
});

const anybody = Anybody({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-anybody",
  axes: ["wdth"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Onn AI — Setiap Suara, Satu Tekad Demi Kestabilan Johor",
  description:
    "Jangan \'spin\' media sosial kelirukan kita. Semak Kad Laporan Johor 2022-2026 & 63 Tekad Manifesto BN Johor secara real-time.",
  metadataBase: new URL("https://onnai.sekijang-ai.xyz"),

  // Memetakan tag manifest & apple-mobile-web-app-title awak
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "OnnAI",
  },

  // Memetakan susunan ikon baharu awak secara tepat
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Mengekalkan konfigurasi Open Graph untuk paparan link share (WhatsApp/Telegram/X)
  openGraph: {
    title: "Onn AI — Satu Suara, Satu Tekad Demi Kestabilan Johor",
    description:
      "Jangan \'spin\' media sosial kelirukan kita. Semak Kad Laporan Johor 2022-2026 & 63 Tekad Manifesto BN Johor secara real-time.",
    url: "https://onnai.sekijang-ai.xyz",
    siteName: "Onn AI",
    images: [
      {
        url: "/onn.jpg",
        width: 1200,
        height: 630,
        alt: "Onn AI Avatar Preview",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onn AI — Satu Suara, Satu Tekad Demi Kestabilan Johor",
    description:
      "Jangan \'spin\' media sosial kelirukan kita. Semak Kad Laporan Johor 2022-2026 & 63 Tekad Manifesto BN Johor secara real-time.",
    images: ["/onn.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ms"
      className={`${plusJakarta.variable} ${anybody.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
