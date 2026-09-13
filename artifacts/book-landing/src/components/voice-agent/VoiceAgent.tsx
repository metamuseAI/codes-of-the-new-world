import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Play, Send, Square } from "lucide-react";
import { askText, askVoice, audioSrcFromResponse, type AskResponse } from "@/lib/api";
import { useLanguage } from "@/lib/language-context";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { cn } from "@/lib/utils";

type Status = "idle" | "listening" | "thinking" | "speaking" | "error";

export function VoiceAgent() {
  const { t, lang } = useLanguage();
  const recorder = useVoiceRecorder();
  const [status, setStatus] = useState<Status>("idle");
  const [response, setResponse] = useState<AskResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setResponse(null);
    setErrorMsg(null);
    setStatus("idle");
  }, [lang]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !response) return;
    a.src = audioSrcFromResponse(response);
    setNeedsManualPlay(false);
    a.play().catch(() => {
      setNeedsManualPlay(true);
      setStatus("idle");
    });
    const onEnd = () => {
      setStatus("idle");
      setNeedsManualPlay(false);
    };
    const onError = () => {
      setStatus("idle");
      setNeedsManualPlay(true);
    };
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onError);
    return () => {
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onError);
    };
  }, [response]);

  function playManually() {
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => {
        setNeedsManualPlay(false);
        setStatus("speaking");
      })
      .catch(() => setNeedsManualPlay(true));
  }

  async function handleResult(promise: Promise<AskResponse>) {
    setStatus("thinking");
    setErrorMsg(null);
    try {
      const res = await promise;
      setResponse(res);
      setStatus("speaking");
    } catch {
      setErrorMsg(t.voiceAgent.error);
      setStatus("error");
    }
  }

  async function toggleMic() {
    if (status === "listening") {
      const blob = await recorder.stop();
      if (!blob) {
        setStatus("idle");
        return;
      }
      await handleResult(askVoice(blob, lang));
      return;
    }
    if (status === "thinking" || status === "speaking") return;
    const ok = await recorder.start();
    if (!ok) {
      setErrorMsg(t.voiceAgent.permissionDenied);
      setStatus("error");
      return;
    }
    setStatus("listening");
  }

  async function submitText(question: string) {
    const q = question.trim();
    if (!q) return;
    setTyped("");
    await handleResult(askText(q, lang));
  }

  const statusText =
    status === "listening"
      ? t.voiceAgent.listening
      : status === "thinking"
        ? t.voiceAgent.thinking
        : status === "speaking"
          ? t.voiceAgent.speaking
          : t.voiceAgent.pressToSpeak;

  const isBusy = status === "thinking";
  const isListening = status === "listening";

  return (
    <div className="mx-auto w-full max-w-3xl" data-testid="voice-agent">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={toggleMic}
          disabled={isBusy}
          data-testid="mic-button"
          aria-label={statusText}
          className={cn(
            "relative flex h-36 w-36 items-center justify-center rounded-full transition-all",
            "border border-[hsl(var(--gold)/0.45)] bg-[hsl(var(--background))]",
            "shadow-[0_0_60px_-15px_hsl(var(--gold)/0.5)]",
            "hover:shadow-[0_0_80px_-15px_hsl(var(--gold)/0.7)]",
            "disabled:cursor-not-allowed disabled:opacity-70",
          )}
        >
          {isListening && (
            <>
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full border border-[hsl(var(--gold)/0.5)]"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full border border-[hsl(var(--gold)/0.35)]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.1, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
            </>
          )}
          {isBusy && (
            <motion.span
              className="pointer-events-none absolute inset-[-2px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, hsl(var(--gold) / 0.7) 60deg, transparent 120deg)",
                WebkitMask:
                  "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 1px))",
                mask: "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 1px))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
            />
          )}
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--paper-deep))]">
            {isListening ? (
              <Square className="h-6 w-6 fill-[hsl(var(--foreground))] text-[hsl(var(--foreground))]" strokeWidth={0} />
            ) : (
              <Mic className="h-7 w-7 text-[hsl(var(--foreground))]" strokeWidth={1.25} />
            )}
          </span>
        </button>

        <p
          className="mt-7 text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--ink-mute))]"
          data-testid="status-text"
        >
          {statusText}
        </p>

        {errorMsg && (
          <p className="mt-3 max-w-sm text-center text-sm text-[hsl(var(--destructive))]" data-testid="error">
            {errorMsg}
          </p>
        )}
      </div>

      {!response && status !== "thinking" && (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {t.voiceAgent.suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => submitText(s)}
              data-testid={`suggestion-${i}`}
              className="rounded-full border border-[hsl(var(--border))] bg-transparent px-4 py-2 text-sm text-[hsl(var(--ink-soft))] transition hover:border-[hsl(var(--gold)/0.6)] hover:text-[hsl(var(--foreground))]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {response && (
          <motion.div
            key={response.reply}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-14 space-y-10"
            data-testid="conversation"
          >
            <div className="space-y-2 text-center">
              <div className="text-[10px] uppercase tracking-[0.4em] text-[hsl(var(--ink-mute))]">
                {t.voiceAgent.youAsked}
              </div>
              <p className="font-serif text-xl italic text-[hsl(var(--ink-soft))]">
                {response.transcript}
              </p>
            </div>
            <div className="mx-auto h-px w-10 bg-[hsl(var(--gold)/0.45)]" />
            <div className="space-y-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.4em] text-[hsl(var(--gold))]">
                {t.voiceAgent.bookSays}
              </div>
              <p
                className="mx-auto max-w-xl font-serif text-2xl leading-relaxed text-[hsl(var(--foreground))] md:text-[28px]"
                data-testid="reply-text"
              >
                {response.reply}
              </p>
              {needsManualPlay && (
                <button
                  type="button"
                  onClick={playManually}
                  data-testid="manual-play"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.5)] px-5 py-2 text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--ink-soft))] transition hover:bg-[hsl(var(--gold)/0.08)]"
                >
                  <Play className="h-3 w-3" strokeWidth={2} />
                  {t.voiceAgent.playReply}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitText(typed);
        }}
        className="mt-14"
        data-testid="text-form"
      >
        <label className="mb-3 block text-center text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--ink-mute))]">
          {t.voiceAgent.typeInstead}
        </label>
        <div className="mx-auto flex max-w-xl items-center gap-2 border-b border-[hsl(var(--border))] focus-within:border-[hsl(var(--gold)/0.7)] transition-colors">
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={t.voiceAgent.inputPlaceholder}
            disabled={isBusy}
            data-testid="text-input"
            className="flex-1 bg-transparent px-1 py-3 font-serif text-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--ink-mute)/0.6)] placeholder:italic focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isBusy || !typed.trim()}
            data-testid="text-submit"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--gold))] transition hover:text-[hsl(var(--foreground))] disabled:opacity-30"
            aria-label={t.voiceAgent.send}
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </form>

      <audio ref={audioRef} className="hidden" data-testid="audio-output" />
    </div>
  );
}
