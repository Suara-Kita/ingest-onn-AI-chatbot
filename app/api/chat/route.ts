// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'

const UNAVAILABLE_MSG =
  'Maaf, sistem tidak tersedia buat masa ini. Sila cuba lagi.\n\nSorry, the system is currently unavailable. Please try again.'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { message } = body as { message?: string }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  const ragUrl = process.env.RAG_API_URL

  if (!ragUrl) {
    // Local development: return a mock response
    await new Promise(r => setTimeout(r, 600))
    return NextResponse.json({
      reply: `**[Mock Response — RAG not configured]**\n\nYou asked: "${message.trim()}"\n\nSet \`RAG_API_URL\` in \`.env.local\` to connect to the deployed knowledge base.`,
      sources: [],
    })
  }

  try {
    const res = await fetch(`${ragUrl}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: message.trim() }),
    })

    if (!res.ok) throw new Error(`Backend ${res.status}`)

    const data = (await res.json()) as { reply?: string; answer?: string; sources?: string[] }
    return NextResponse.json({
      reply: data.reply ?? data.answer ?? '',
      sources: data.sources ?? [],
    })
  } catch {
    return NextResponse.json({ reply: UNAVAILABLE_MSG }, { status: 200 })
  }
}
