# Onn AI — Local Setup

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 20+ | |
| pnpm | 9+ | `npm i -g pnpm` |
| RAG Knowledge Base | — | Must be running on port 8002 |

---

## 1. Clone and install

```bash
git clone https://github.com/Suara-Kita/Onn-AI-chatbot.git
cd Onn-AI-chatbot

pnpm install
```

---

## 2. Configure environment

```bash
cp .env.local.example .env.local   # or create manually
```

**.env.local**

```env
# RAG knowledge base server (run rag-knowledge-base first)
RAG_API_URL=http://localhost:8002
```

> The RAG server must be running before starting onn-ai.  
> See `rag-knowledge-base/LOCAL_SETUP.md` for setup instructions.

---

## 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. How the chat works

```
Browser → POST /api/chat → Next.js route → POST http://localhost:8002/query
                                                        ↓
                                              RAG pipeline (Neo4j + LLM)
                                                        ↓
                                              { "answer": "..." }
```

- If `RAG_API_URL` is not set, the chat returns a mock response so UI development can continue without the backend.
- The RAG server handles language detection and returns prose answers in the same language as the question (BM or English).

---

## 5. Run tests

```bash
pnpm test          # run once
pnpm test:watch    # watch mode
```

---

## 6. Build for production

```bash
pnpm build
pnpm start
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Chat shows "sistem tidak tersedia" | RAG server not running or wrong port | Start `python -m src.main` in rag-knowledge-base; confirm `RAG_API_URL=http://localhost:8002` |
| Mock response shown | `RAG_API_URL` missing from `.env.local` | Add `RAG_API_URL=http://localhost:8002` |
| Stale response after RAG changes | RAG server not restarted | Kill and restart `python -m src.main` |
