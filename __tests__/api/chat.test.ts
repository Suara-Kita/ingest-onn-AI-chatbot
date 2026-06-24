/**
 * @jest-environment node
 */
// __tests__/api/chat.test.ts
import { POST } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

const makeRequest = (body: object) =>
  new NextRequest('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('POST /api/chat', () => {
  const originalEnv = process.env.RAG_API_URL

  beforeEach(() => {
    jest.clearAllMocks()
    delete process.env.RAG_API_URL
  })

  afterEach(() => {
    if (originalEnv) process.env.RAG_API_URL = originalEnv
    else delete process.env.RAG_API_URL
  })

  it('returns 400 for missing message', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns mock reply when RAG_API_URL is not set', async () => {
    const res = await POST(makeRequest({ message: 'Hello' }))
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(typeof data.reply).toBe('string')
    expect(data.reply.length).toBeGreaterThan(0)
  })

  it('proxies to RAG backend when RAG_API_URL is set', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'RAG answer here' }),
    } as Response)

    const res = await POST(makeRequest({ message: 'What is GDP?' }))
    const data = await res.json()

    expect(data.reply).toBe('RAG answer here')
    expect(fetch).toHaveBeenCalledWith(
      'http://rag-backend/query',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('returns inline error message when RAG backend fails', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    const res = await POST(makeRequest({ message: 'Hello' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.reply).toContain('tidak tersedia')
  })
})
