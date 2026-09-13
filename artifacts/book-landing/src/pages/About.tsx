import { motion } from "framer-motion";
import { Link } from "wouter";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SacredGeometry } from "@/components/SacredGeometry";
import { useLanguage } from "@/lib/language-context";

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
    <Link
      href="/"
      data-testid="brand"
      className={`inline-flex items-center gap-3 font-serif text-[15px] uppercase tracking-[0.42em] text-[hsl(var(--foreground))] ${className ?? ""}`}
    >
      <span className="h-px w-5 bg-[hsl(var(--gold))]" aria-hidden="true" />
      Meta&nbsp;Muse
      <span className="h-px w-5 bg-[hsl(var(--gold))]" aria-hidden="true" />
    </Link>
  );
}

export default function About() {
  const { t } = useLanguage();
  const a = t.author;
  const imgSrc = `${import.meta.env.BASE_URL}images/natalia.png`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="paper-grain" />

      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-40 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Brand />
          <nav className="hidden items-center gap-10 text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--ink-mute))] md:flex">
            <Link href="/" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.home}
            </Link>
            <Link href="/#about" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.about}
            </Link>
            <Link href="/#voice" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.voice}
            </Link>
            <Link href="/#read" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.read}
            </Link>
            <Link href="/access" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.access}
            </Link>
          </nav>
          <LanguageToggle />
        </div>
        <div className="border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.6)] md:hidden">
          <nav className="mx-auto flex max-w-7xl items-center justify-start gap-5 overflow-x-auto whitespace-nowrap px-6 py-3 text-[9px] uppercase tracking-[0.28em] text-[hsl(var(--ink-mute))]">
            <Link href="/" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.home}
            </Link>
            <Link href="/#about" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.about}
            </Link>
            <Link href="/#voice" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.voice}
            </Link>
            <Link href="/#read" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.read}
            </Link>
            <Link href="/access" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.access}
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 pt-36 pb-16 md:pt-44">
        <div className="light-wash" />
        <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 text-[hsl(var(--gold)/0.4)]">
          <div className="animate-drift">
            <SacredGeometry variant="circles" size={460} />
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--gold))]">
              {a.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="mt-10 font-serif text-5xl font-light leading-[1.05] tracking-tight text-[hsl(var(--foreground))] md:text-7xl">
              {a.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Divider />
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mx-auto mt-10 max-w-2xl font-serif text-xl italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-2xl">
              {a.tagline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PORTRAIT */}
      <section className="relative px-6 py-16">
        <FadeIn>
          <figure className="relative mx-auto max-w-[520px]">
            <div className="pointer-events-none absolute -inset-10 text-[hsl(var(--gold)/0.35)] flex items-center justify-center">
              <SacredGeometry variant="seed" size={600} />
            </div>
            <div className="relative overflow-hidden rounded-[2px] shadow-[0_30px_80px_-30px_rgba(60,40,10,0.25)]">
              <img
                src={imgSrc}
                alt={a.name}
                className="block h-auto w-full object-cover"
                data-testid="img-author"
              />
            </div>
          </figure>
        </FadeIn>
      </section>

      {/* INTRO */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {a.intro.map((line, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <p className="mt-6 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
                {line}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WORKS WITH + APPROACH */}
      <section className="relative px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-20 md:grid-cols-2">
          <FadeIn>
            <div>
              <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                {a.worksWithTitle}
              </div>
              <div className="mt-6">
                <Divider width="w-10" />
              </div>
              <p className="mt-8 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
                {a.worksWith}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                {a.approachTitle}
              </div>
              <div className="mt-6">
                <Divider width="w-10" />
              </div>
              <p className="mt-8 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
                {a.approach}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HELPS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {a.helpsTitle}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8">
              <Divider />
            </div>
          </FadeIn>
          <ul className="mt-14 space-y-7 text-left">
            {a.helps.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <li className="flex items-baseline gap-5 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
                  <span className="font-serif text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative px-6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 text-[hsl(var(--gold)/0.3)]">
          <div className="animate-spin-slow">
            <SacredGeometry variant="seed" size={480} />
          </div>
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {a.philosophyTitle}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-12 font-serif text-2xl italic leading-relaxed text-[hsl(var(--foreground))] md:text-3xl md:leading-[1.45]">
              {a.philosophy}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CREDO */}
      <section className="relative px-6 pt-16 pb-36">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto text-[hsl(var(--gold)/0.6)]">
              <SacredGeometry variant="dotline" size={220} />
            </div>
            <div className="mt-10 text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {a.credoTitle}
            </div>
            <p className="mt-10 font-serif text-3xl italic leading-relaxed text-[hsl(var(--foreground))] md:text-4xl md:leading-[1.4]">
              {a.credo}
            </p>
            <div className="mt-16 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <Link
                href="/#voice"
                className="rounded-full border border-[hsl(var(--gold))] px-8 py-3 text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
              >
                {t.hero.cta}
              </Link>
              <Link
                href="/"
                className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--ink-mute))] underline-offset-8 hover:text-[hsl(var(--foreground))] hover:underline"
              >
                {t.nav.home}
              </Link>
            </div>
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
