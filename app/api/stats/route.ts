// app/api/stats/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const ragUrl = process.env.RAG_API_URL

  if (!ragUrl) {
    return NextResponse.json({ questions: null, maklumBalas: null })
  }

  try {
    const res = await fetch(`${ragUrl}/stats`, {
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error(`KB ${res.status}`)
    const data = await res.json() as { questions: number | null; maklumBalas: number | null }
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=30' },
    })
  } catch {
    return NextResponse.json({ questions: null, maklumBalas: null })
  }
}
