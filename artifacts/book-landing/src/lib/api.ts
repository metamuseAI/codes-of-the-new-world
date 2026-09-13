import type { Language } from "./i18n";

export type AskResponse = {
  transcript: string;
  reply: string;
  audioBase64: string;
  audioMime: string;
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export async function askVoice(blob: Blob, lang: Language): Promise<AskResponse> {
  const form = new FormData();
  form.append("audio", blob, "input.webm");
  form.append("lang", lang);
  const res = await fetch(`${BASE}/api/book/ask-voice`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`voice request failed (${res.status})`);
  return (await res.json()) as AskResponse;
}

export async function askText(question: string, lang: Language): Promise<AskResponse> {
  const res = await fetch(`${BASE}/api/book/ask-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, lang }),
  });
  if (!res.ok) throw new Error(`text request failed (${res.status})`);
  return (await res.json()) as AskResponse;
}

export function audioSrcFromResponse(r: AskResponse): string {
  return `data:${r.audioMime};base64,${r.audioBase64}`;
}

export async function subscribe(email: string, lang: Language): Promise<void> {
  const res = await fetch(`${BASE}/api/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, lang }),
  });
  if (!res.ok) throw new Error(`subscribe failed (${res.status})`);
}
