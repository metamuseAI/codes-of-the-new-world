import { useState } from "react";
import { Send } from "lucide-react";
import { subscribe } from "@/lib/api";
import { useLanguage } from "@/lib/language-context";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm() {
  const { t, lang } = useLanguage();
  const s = t.subscribe;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage(s.invalid);
      return;
    }
    setStatus("submitting");
    setMessage(null);
    try {
      await subscribe(value, lang);
      setStatus("success");
      setMessage(s.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(s.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-12 max-w-md" data-testid="subscribe-form">
      <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] transition-colors focus-within:border-[hsl(var(--gold)/0.7)]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={s.placeholder}
          disabled={status === "submitting"}
          data-testid="subscribe-input"
          aria-label={s.placeholder}
          className="flex-1 bg-transparent px-1 py-3 font-serif text-lg text-[hsl(var(--foreground))] placeholder:italic placeholder:text-[hsl(var(--ink-mute)/0.6)] focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "submitting" || !email.trim()}
          data-testid="subscribe-submit"
          aria-label={s.submit}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--gold))] transition hover:text-[hsl(var(--foreground))] disabled:opacity-30"
        >
          <Send className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      {message && (
        <p
          data-testid="subscribe-message"
          className={
            "mt-4 text-center text-sm " +
            (status === "success"
              ? "text-[hsl(var(--gold))]"
              : "text-[hsl(var(--destructive))]")
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
