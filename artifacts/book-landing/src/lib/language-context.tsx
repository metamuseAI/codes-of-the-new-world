import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language } from "./i18n";

type Ctx = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (typeof translations)["ru"];
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "book-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "ru";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "ru";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    const t = translations[lang];
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.meta.description);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang: setLangState, t: translations[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
