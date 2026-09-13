# Codes of the New World — Book Landing

Bilingual (RU/EN) landing page for the book "Коды нового мира. Глава Пробуждения" / "Codes of the New World. The Awakening Chapter" with an in-page voice agent that answers questions about the book using the full book text as grounding context.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server (handles voice/text agent)
- `pnpm --filter @workspace/book-landing run dev` — landing page
- `pnpm run typecheck` — full typecheck across all packages
- Required env: `OPENAI_API_KEY` (transcription + chat + TTS)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5, OpenAI SDK, multer (audio upload), express-rate-limit
- Frontend: React 19 + Vite, Tailwind v4, framer-motion, wouter, shadcn/ui
- AI: `gpt-4o-mini-transcribe` (STT) → `gpt-4o-mini` (chat with full book text in system prompt) → `tts-1` (audio reply)

## Where things live

- `artifacts/api-server/src/routes/book.ts` — voice + text agent endpoints
- `artifacts/api-server/src/lib/book.ts` — book text (RU + EN), generated from PDFs
- `artifacts/book-landing/src/pages/Home.tsx` — landing page
- `artifacts/book-landing/src/components/voice-agent/VoiceAgent.tsx` — voice UI
- `artifacts/book-landing/src/lib/i18n.ts` — single source of truth for all copy in RU + EN
- `artifacts/book-landing/public/images/` — hero artwork

## Architecture decisions

- No vector DB / RAG: the book is ~20 KB; we just put the full text in the system prompt.
- Voice flow is a synchronous chain (STT → chat → TTS) returning JSON with base64 audio. Skipped SSE/streaming for simplicity — the pnpm-workspace skill notes binary/streaming endpoints don't codegen well via Orval, so the frontend uses plain `fetch` (no OpenAPI codegen for `/api/book/*`).
- Browser records `audio/webm;codecs=opus`, which OpenAI transcription accepts natively (no ffmpeg conversion).
- Rate limiting: 40 requests / IP / hour on the AI endpoints to bound OpenAI cost from public abuse.
- Body limits: 200 KB for JSON; 8 MB for audio uploads.
- Language preference is persisted in `localStorage` and updates `<title>`, `<meta description>`, and `<html lang>` reactively.

## API

- `POST /api/book/ask-voice` — multipart `audio` (webm) + `lang` ("ru" | "en") → `{ transcript, reply, audioBase64, audioMime }`
- `POST /api/book/ask-text` — JSON `{ question, lang }` → same shape

## Gotchas

- The book text in `src/lib/book.ts` is auto-derived from the original PDFs. To update, re-extract with `pdftotext` and rewrite that file.
- Voices: RU uses `shimmer`, EN uses `nova` (tts-1).
- The voice agent shows a "Hear the reply" button when browser autoplay policy blocks playback.
