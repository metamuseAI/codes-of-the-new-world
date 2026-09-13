import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em]"
      data-testid="language-toggle"
    >
      {(["ru", "en"] as const).map((code, i) => (
        <span key={code} className="inline-flex items-center gap-3">
          <button
            type="button"
            role="radio"
            aria-checked={lang === code}
            aria-label={code === "ru" ? "Русский" : "English"}
            onClick={() => setLang(code)}
            data-testid={`lang-${code}`}
            className={cn(
              "transition-colors",
              lang === code
                ? "text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--ink-mute))] hover:text-[hsl(var(--ink-soft))]",
            )}
          >
            {code === "ru" ? "Рус" : "Eng"}
          </button>
          {i === 0 && (
            <span className="text-[hsl(var(--ink-mute))]/40" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
