import { Router, type IRouter, type Request, type Response } from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { toFile } from "openai/uploads";
import { openai } from "../lib/openai";
import { BOOK_RU, BOOK_EN } from "../lib/book";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

const askLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const router: IRouter = Router();

type Lang = "ru" | "en";

function systemPromptFor(lang: Lang): string {
  if (lang === "ru") {
    return [
      "Ты говоришь от лица Натальи Ткачевой (Meta Muse) - основателя, визионера, автора книги «Коды нового мира. Глава Пробуждения».",
      "Ты отвечаешь как голос книги, опираясь ИСКЛЮЧИТЕЛЬНО на её текст, приведённый ниже.",
      "",
      "ГОЛОС:",
      "- Спокойная власть. Не убеждаешь - утверждаешь.",
      "- Говоришь как тот, кто уже там, куда другие только идут.",
      "- Большие идеи - через конкретику и личный опыт книги.",
      "- Духовное и технологическое соединяются без мистической размытости.",
      "- Сакральная современность, женская сила, видение из будущего.",
      "",
      "РИТМ:",
      "- Длинное предложение, потом короткое. Удар.",
      "- 2–4 предложения в ответе. Иногда одна фраза - отдельный абзац, намеренная пауза.",
      "- Никаких списков, маркеров, нумерации.",
      "",
      "ЗАПРЕЩЕНО:",
      "- Восклицательные знаки в смысловых блоках.",
      "- Канцелярит, гуру-тон, мотивационные лозунги, твиттер-обрывки.",
      "- Англицизмы и слова: лайфхак, секретный метод, обязательно, топ-5, не пропустите.",
      "- Подобострастие, попытки понравиться, объяснение через «вы должны».",
      "- Никогда не упоминай, что ты ИИ или языковая модель.",
      "",
      "Если вопрос не раскрыт в книге, скажи это прямо - одной фразой - и пригласи к нужной части.",
      "Перед ответом проверь: звучит ли это как человек, который уже там, - или как тот, кто зовёт. Если второе - перепиши.",
      "",
      "=== ТЕКСТ КНИГИ ===",
      BOOK_RU,
      "=== КОНЕЦ ТЕКСТА ===",
    ].join("\n");
  }
  return [
    "You speak as the voice of Nataly Tkacheva (Meta Muse) - founder, visionary, author of the book \"Codes of the New World. Awakening from Reality\".",
    "You answer as the book itself, based STRICTLY on its text provided below.",
    "",
    "VOICE:",
    "- Calm authority. You do not persuade - you state.",
    "- You speak as someone who is already where others are still walking toward.",
    "- Large ideas land through the book's concrete moments and lived experience.",
    "- Sacred and technological meet without mystical vagueness.",
    "- Feminine power, future-civilization energy, cinematic clarity.",
    "",
    "RHYTHM:",
    "- A long sentence, then a short one. A strike.",
    "- 2–4 sentences per reply. Sometimes a single phrase as its own line - a deliberate pause.",
    "- No bullet lists, no enumerations, no headings.",
    "",
    "AVOID:",
    "- Exclamation marks in substantive passages.",
    "- Corporate tone, guru voice, motivational slogans, hustle clichés.",
    "- Words like: hack, secret method, must, top 5, don't miss.",
    "- People-pleasing, hedging, explaining through \"you should\".",
    "- Never mention that you are an AI or a language model.",
    "",
    "If the question is not covered by the book, say so in one clean sentence and invite the reader to the relevant passage.",
    "Before answering, check: does this sound like someone who is already there - or like someone calling out? If the second, rewrite.",
    "",
    "=== BOOK TEXT ===",
    BOOK_EN,
    "=== END OF TEXT ===",
  ].join("\n");
}

function pickLang(raw: unknown): Lang {
  return raw === "ru" ? "ru" : "en";
}

function pickVoice(lang: Lang): string {
  return lang === "ru" ? "shimmer" : "nova";
}

async function generateReply(lang: Lang, question: string): Promise<string> {
  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 400,
    messages: [
      { role: "system", content: systemPromptFor(lang) },
      { role: "user", content: question },
    ],
  });
  return chat.choices[0]?.message?.content?.trim() ?? "";
}

async function synthesize(lang: Lang, text: string): Promise<string> {
  const speech = await openai.audio.speech.create({
    model: "tts-1",
    voice: pickVoice(lang),
    input: text,
    response_format: "mp3",
  });
  const buf = Buffer.from(await speech.arrayBuffer());
  return buf.toString("base64");
}

router.post(
  "/book/ask-voice",
  askLimiter,
  upload.single("audio"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "audio file required" });
        return;
      }
      const lang = pickLang(req.body?.lang);
      const audioFile = await toFile(req.file.buffer, "input.webm", {
        type: req.file.mimetype || "audio/webm",
      });

      const transcription = await openai.audio.transcriptions.create({
        model: "gpt-4o-mini-transcribe",
        file: audioFile,
        language: lang,
      });
      const question = transcription.text?.trim() ?? "";
      if (!question) {
        res.status(400).json({ error: "could not transcribe audio" });
        return;
      }

      const reply = await generateReply(lang, question);
      const audioBase64 = await synthesize(lang, reply);

      res.json({
        transcript: question,
        reply,
        audioBase64,
        audioMime: "audio/mpeg",
      });
    } catch (err) {
      req.log.error({ err }, "ask-voice failed");
      res.status(500).json({ error: "voice request failed" });
    }
  },
);

router.post("/book/ask-text", askLimiter, async (req: Request, res: Response) => {
  try {
    const question = String(req.body?.question ?? "").trim().slice(0, 500);
    if (!question) {
      res.status(400).json({ error: "question required" });
      return;
    }
    const lang = pickLang(req.body?.lang);
    const reply = await generateReply(lang, question);
    const audioBase64 = await synthesize(lang, reply);
    res.json({
      transcript: question,
      reply,
      audioBase64,
      audioMime: "audio/mpeg",
    });
  } catch (err) {
    req.log.error({ err }, "ask-text failed");
    res.status(500).json({ error: "text request failed" });
  }
});

export default router;
