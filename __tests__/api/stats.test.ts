/**
 * @jest-environment node
 */
// __tests__/api/stats.test.ts
import { GET } from '@/app/api/stats/route'

describe('GET /api/stats', () => {
  const originalEnv = process.env.RAG_API_URL

  beforeEach(() => {
    jest.clearAllMocks()
    delete process.env.RAG_API_URL
  })

  afterEach(() => {
    if (originalEnv) process.env.RAG_API_URL = originalEnv
    else delete process.env.RAG_API_URL
  })

  it('returns nulls when RAG_API_URL is not set', async () => {
    const res = await GET()
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toEqual({ questions: null, maklumBalas: null })
  })

  it('returns counts from KB /stats', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ questions: 42, maklumBalas: 7 }),
    } as Response)

    const res = await GET()
    const data = await res.json()

    expect(data).toEqual({ questions: 42, maklumBalas: 7 })
    expect(fetch).toHaveBeenCalledWith(
      'http://rag-backend/stats',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    )
  })

  it('sets Cache-Control header on success', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ questions: 10, maklumBalas: 2 }),
    } as Response)

    const res = await GET()
    expect(res.headers.get('cache-control')).toContain('max-age=10')
  })

  it('returns nulls when KB responds non-200', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
    } as Response)

    const res = await GET()
    const data = await res.json()
    expect(data).toEqual({ questions: null, maklumBalas: null })
  })

  it('returns nulls when KB fetch throws', async () => {
    process.env.RAG_API_URL = 'http://rag-backend'
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    const res = await GET()
    const data = await res.json()
    expect(data).toEqual({ questions: null, maklumBalas: null })
  })
})
