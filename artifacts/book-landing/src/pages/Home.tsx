import { motion } from "framer-motion";
import { Link } from "wouter";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VoiceAgent } from "@/components/voice-agent/VoiceAgent";
import { SubscribeForm } from "@/components/SubscribeForm";
import { SacredGeometry } from "@/components/SacredGeometry";
import { useLanguage } from "@/lib/language-context";
import { BOOK_CONTENT, BOOK_LABELS } from "@/lib/book-content";

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Divider({ width = "w-12" }: { width?: string }) {
  return <div className={`mx-auto h-px ${width} bg-[hsl(var(--gold)/0.55)]`} />;
}

function Brand({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      data-testid="brand"
      className={`inline-flex items-center gap-3 font-serif text-[15px] uppercase tracking-[0.42em] text-[hsl(var(--foreground))] ${className ?? ""}`}
    >
      <span className="h-px w-5 bg-[hsl(var(--gold))]" aria-hidden="true" />
      Meta&nbsp;Muse
      <span className="h-px w-5 bg-[hsl(var(--gold))]" aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const book = BOOK_CONTENT[lang];
  const bookLabels = BOOK_LABELS[lang];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="paper-grain" />

      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-40 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Brand />
          <nav className="hidden items-center gap-10 text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--ink-mute))] md:flex">
            <a href="#about" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.about}
            </a>
            <a href="#voice" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.voice}
            </a>
            <a href="#read" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.read}
            </a>
            <Link href="/about" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.author}
            </Link>
            <Link href="/access" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.access}
            </Link>
          </nav>
          <LanguageToggle />
        </div>
        <div className="border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.6)] md:hidden">
          <nav className="mx-auto flex max-w-7xl items-center justify-start gap-5 overflow-x-auto whitespace-nowrap px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-[hsl(var(--ink-mute))]">
            <a href="#about" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.about}
            </a>
            <a href="#voice" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.voice}
            </a>
            <a href="#read" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.read}
            </a>
            <Link href="/about" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.author}
            </Link>
            <Link href="/access" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.access}
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-start px-6 pt-44 pb-24 md:pt-36"
      >
        <div className="light-wash" />

        {/* Sacred geometry behind title */}
        <div className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 text-[hsl(var(--gold)/0.55)] md:top-32">
          <div className="animate-drift">
            <SacredGeometry variant="circles" size={420} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--gold))]">
              {t.hero.subtitle}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="mt-10 font-serif text-6xl font-light leading-[0.95] tracking-tight text-[hsl(var(--foreground))] md:text-8xl">
              {t.hero.title}
              <br />
              <span className="italic text-[hsl(var(--ink-soft))]">{t.hero.titleLine2}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Divider />
            </div>
          </FadeIn>
          <FadeIn delay={0.55}>
            <div className="mt-52 flex flex-col items-center gap-5 sm:flex-row sm:justify-center md:mt-36">
              <a
                href="#voice"
                data-testid="hero-cta-voice"
                className="rounded-full border border-[hsl(var(--gold))] px-8 py-3 text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
              >
                {t.hero.cta}
              </a>
              <a
                href="#read"
                className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--ink-mute))] underline-offset-8 hover:text-[hsl(var(--foreground))] hover:underline"
              >
                {t.nav.read}
              </a>
            </div>
          </FadeIn>
        </div>

      </section>

      {/* QUOTE */}
      <section className="relative px-6 pt-32 pb-44">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto text-[hsl(var(--gold)/0.6)]">
              <SacredGeometry variant="dotline" size={240} />
            </div>
            <blockquote className="mt-14 font-serif text-3xl italic leading-relaxed text-[hsl(var(--foreground))] md:text-[40px] md:leading-[1.3]">
              <p>{t.quotes.q1[0]}</p>
              <p className="mt-[76px]">{t.quotes.q1[1]}</p>
            </blockquote>
            <div className="mt-14 mx-auto text-[hsl(var(--gold)/0.6)]">
              <SacredGeometry variant="dotline" size={240} />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-20 md:grid-cols-[1fr_1.2fr]">
          <FadeIn className="flex items-center justify-center">
            <div className="text-[hsl(var(--gold)/0.7)]">
              <SacredGeometry variant="seed" size={340} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                {t.about.eyebrow}
              </div>
              <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[hsl(var(--foreground))] md:text-5xl">
                {t.about.title}
              </h2>
              <div className="mt-8">
                <Divider width="w-10" />
              </div>
              <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
                {t.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT AWAITS */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {t.whatAwaits.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 text-center font-serif text-4xl font-light leading-tight text-[hsl(var(--foreground))] md:text-5xl">
              {t.whatAwaits.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Divider />
            </div>
          </FadeIn>
          <div className="mt-20 grid gap-16 md:grid-cols-3">
            {t.whatAwaits.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-serif text-sm uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mx-auto mt-5 h-px w-6 bg-[hsl(var(--gold)/0.5)]" />
                  <h3 className="mt-6 font-serif text-2xl italic text-[hsl(var(--foreground))]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-relaxed text-[hsl(var(--ink-soft))]">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VOICE AGENT */}
      <section id="voice" className="relative px-6 py-36">
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[hsl(var(--gold)/0.3)]">
          <div className="animate-spin-slow">
            <SacredGeometry variant="seed" size={520} />
          </div>
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {t.voiceAgent.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[hsl(var(--foreground))] md:text-5xl">
              {t.voiceAgent.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-8">
              <Divider width="w-10" />
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
              {t.voiceAgent.description}
            </p>
          </FadeIn>
        </div>
        <div className="relative mt-16">
          <VoiceAgent />
        </div>
      </section>

      {/* READ — full book */}
      <section id="read" className="relative px-6 pt-40 pb-44">
        {/* Title page */}
        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--gold))]">
              {bookLabels.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16 text-[hsl(var(--gold)/0.7)] flex justify-center">
              <SacredGeometry variant="circles" size={220} />
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-12 text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--ink-mute))]">
              {book.prologue.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.26}>
            <h2 className="mt-10 font-serif text-5xl font-light leading-[1.05] text-[hsl(var(--foreground))] md:text-7xl">
              {book.prologue.titleLine1}
              <br />
              <span className="italic text-[hsl(var(--ink-soft))]">{book.prologue.titleLine2}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.36}>
            <div className="mt-14 text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--ink-mute))]">
              {book.prologue.date}
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-20">
              <Divider />
            </div>
          </FadeIn>
        </div>

        {/* Parts */}
        <div className="relative mx-auto mt-40 max-w-2xl space-y-36">
          {book.parts.map((part, idx) => (
            <FadeIn key={part.numeral}>
              <article className="text-center">
                <div className="font-serif text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--gold))]">
                  {bookLabels.partLabel} · {part.numeral}
                </div>
                <h3 className="mt-10 font-serif text-3xl font-light italic leading-[1.15] text-[hsl(var(--foreground))] md:text-[44px]">
                  {part.title}
                </h3>
                <div className="mx-auto mt-10 h-px w-10 bg-[hsl(var(--gold)/0.55)]" />
                <div className="mt-14 space-y-7 text-left font-serif text-[17px] leading-[1.9] text-[hsl(var(--ink-soft))] md:text-[19px]">
                  {part.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mx-auto mt-16 h-px w-6 bg-[hsl(var(--gold)/0.45)]" />
                <p className="mx-auto mt-10 max-w-xl font-serif text-xl italic leading-[1.5] text-[hsl(var(--foreground))] md:text-2xl">
                  {part.coda}
                </p>
                {idx < book.parts.length - 1 && (
                  <div className="mt-24 text-[hsl(var(--gold)/0.5)] flex justify-center">
                    <SacredGeometry variant="dotline" size={180} />
                  </div>
                )}
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Colophon */}
        <FadeIn>
          <div className="mx-auto mt-40 max-w-xl text-center">
            <Divider />
            <div className="mt-12 text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--ink-mute))]">
              {book.epilogue.line}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CLOSING */}
      <section className="relative px-6 py-36">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto text-[hsl(var(--gold)/0.6)]">
              <SacredGeometry variant="dotline" size={200} />
            </div>
            <p className="mt-12 font-serif text-3xl italic leading-relaxed text-[hsl(var(--foreground))] md:text-4xl">
              {t.closing.line}
            </p>
            <a
              href="#voice"
              className="mt-14 inline-block rounded-full border border-[hsl(var(--gold))] px-8 py-3 text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
            >
              {t.closing.cta}
            </a>
          </div>
        </FadeIn>
      </section>

      {/* SUBSCRIBE */}
      <section id="subscribe" className="relative px-6 py-32">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {t.subscribe.eyebrow}
            </div>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[hsl(var(--foreground))] md:text-5xl">
              {t.subscribe.title}
            </h2>
            <div className="mt-8">
              <Divider width="w-10" />
            </div>
            <p className="mx-auto mt-8 max-w-md font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
              {t.subscribe.description}
            </p>
            <SubscribeForm />
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[hsl(var(--border))] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <Brand />
          <a
            href="https://www.instagram.com/nataly_tkacheva/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--ink-mute))] transition-colors hover:text-[hsl(var(--foreground))]"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[14px] w-[14px] stroke-current"
              fill="none"
              strokeWidth="1.4"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>{t.footer.follow} · @nataly_tkacheva</span>
          </a>
          <div className="text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--ink-mute))]">
            © {new Date().getFullYear()} · {t.footer.author} · {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
