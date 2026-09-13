import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SacredGeometry } from "@/components/SacredGeometry";
import { useLanguage } from "@/lib/language-context";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqkazoj";

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

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-10 space-y-6 text-left">
      {items.map((item, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <li className="flex items-baseline gap-5 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
            <span className="font-serif text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        </FadeIn>
      ))}
    </ul>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <FadeIn>
          <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
            {eyebrow}
          </div>
        </FadeIn>
      ) : null}
      {title ? (
        <FadeIn delay={0.1}>
          <h2 className="mt-6 font-serif text-3xl font-light leading-tight text-[hsl(var(--foreground))] md:text-4xl">
            {title}
          </h2>
        </FadeIn>
      ) : null}
      <FadeIn delay={0.18}>
        <div className="mt-8">
          <Divider width="w-10" />
        </div>
      </FadeIn>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Access() {
  const { t, lang } = useLanguage();
  const a = t.access;
  const [status, setStatus] = useState<Status>("idle");
  const [selectedTier, setSelectedTier] = useState<string>("");

  const selectedTierData = a.tiers.find((tier) => tier.id === selectedTier);

  function chooseTier(id: string) {
    setSelectedTier(id);
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const tierName = selectedTierData ? `${selectedTierData.name} (${selectedTierData.price})` : "(not selected)";
    data.set("tier", tierName);
    data.append("_subject", `Meta Muse · Private Access · ${tierName} (${lang.toUpperCase()})`);
    data.append("_language", lang);

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "mt-3 w-full border-0 border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 font-serif text-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--ink-mute)/0.6)] focus:border-[hsl(var(--gold))] focus:outline-none focus:ring-0";
  const labelClass = "text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--ink-mute))]";

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
            <Link href="/about" className="transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.author}
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
            <Link href="/about" className="shrink-0 transition-colors hover:text-[hsl(var(--foreground))]">
              {t.nav.author}
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
            <h1 className="mt-10 font-serif text-5xl font-light leading-[1.05] tracking-tight text-[hsl(var(--foreground))] md:text-6xl">
              {a.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Divider />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {a.intro.map((line, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="mt-6 font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
                {line}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TOGETHER */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHead title={a.togetherTitle} />
          <NumberedList items={a.together} />
          <FadeIn delay={0.2}>
            <p className="mt-14 text-center font-serif text-lg italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
              {a.togetherCoda}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* RESULT */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 text-[hsl(var(--gold)/0.3)]">
          <div className="animate-spin-slow">
            <SacredGeometry variant="seed" size={420} />
          </div>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <SectionHead eyebrow={a.resultTitle} />
          <FadeIn delay={0.1}>
            <p className="mt-10 text-center font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
              {a.resultIntro}
            </p>
          </FadeIn>
          <NumberedList items={a.result} />
          <FadeIn delay={0.2}>
            <p className="mt-16 text-center font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
              {a.resultBody}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center font-serif text-base text-[hsl(var(--ink-soft))] md:text-lg">
              {a.launches.map((item, i) => (
                <li
                  key={i}
                  className="after:ml-6 after:text-[hsl(var(--gold))] last:after:hidden after:content-['·']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* PRIVATE */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 text-[hsl(var(--gold)/0.4)]">
          <div className="animate-drift">
            <SacredGeometry variant="seed" size={500} />
          </div>
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
              {a.privateTitle}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8">
              <Divider />
            </div>
          </FadeIn>
          {a.privateBody.map((line, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <p
                className={`mt-8 font-serif leading-relaxed text-[hsl(var(--ink-soft))] ${
                  i === 0
                    ? "text-2xl italic text-[hsl(var(--foreground))] md:text-3xl"
                    : "text-lg md:text-xl"
                }`}
              >
                {line}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow={a.tiersTitle} />
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
              {a.tiersIntro}
            </p>
          </FadeIn>

          <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-12">
            {a.tiers.map((tier, i) => {
              const isSelected = selectedTier === tier.id;
              return (
                <FadeIn key={tier.id} delay={0.15 + i * 0.1}>
                  <article
                    data-testid={`tier-${tier.id}`}
                    className={`relative flex h-full flex-col gap-8 rounded-[2px] border bg-[hsl(var(--background))/0.4] p-10 transition-all md:p-12 ${
                      isSelected
                        ? "border-[hsl(var(--gold))] shadow-[0_30px_80px_-30px_rgba(60,40,10,0.35)]"
                        : "border-[hsl(var(--border))]"
                    }`}
                  >
                    <header className="text-center">
                      <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-[hsl(var(--foreground))] md:text-3xl">
                        {tier.name}
                      </h3>
                      <p className="mt-6 font-serif text-base italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
                        {tier.tagline}
                      </p>
                      <div className="mt-8">
                        <Divider width="w-10" />
                      </div>
                    </header>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--gold))]">
                        {tier.formatTitle}
                      </div>
                      <ul className="mt-5 space-y-3 font-serif text-base leading-relaxed text-[hsl(var(--ink-soft))]">
                        {tier.format.map((item, j) => (
                          <li key={j} className="flex gap-3">
                            <span aria-hidden="true" className="text-[hsl(var(--gold))]">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--gold))]">
                        {tier.processTitle}
                      </div>
                      <ul className="mt-5 space-y-3 font-serif text-base leading-relaxed text-[hsl(var(--ink-soft))]">
                        {tier.process.map((item, j) => (
                          <li key={j} className="flex gap-3">
                            <span aria-hidden="true" className="text-[hsl(var(--gold))]">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tier.result.length > 0 ? (
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--gold))]">
                          {tier.resultTitle}
                        </div>
                        <ul className="mt-5 space-y-3 font-serif text-base leading-relaxed text-[hsl(var(--ink-soft))]">
                          {tier.result.map((item, j) => (
                            <li key={j} className="flex gap-3">
                              <span aria-hidden="true" className="text-[hsl(var(--gold))]">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {"resultBody" in tier && tier.resultBody ? (
                      <p className="font-serif text-base italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
                        {tier.resultBody}
                      </p>
                    ) : null}

                    <div className="mt-auto pt-4 text-center">
                      <div className="text-[10px] uppercase tracking-[0.42em] text-[hsl(var(--gold))]">
                        {tier.priceLabel}
                      </div>
                      <div className="mt-4 font-serif text-5xl font-light tracking-tight text-[hsl(var(--foreground))] md:text-6xl">
                        {tier.price}
                      </div>
                      <button
                        type="button"
                        onClick={() => chooseTier(tier.id)}
                        data-testid={`button-choose-${tier.id}`}
                        aria-pressed={isSelected}
                        className={`mt-10 inline-flex items-center justify-center rounded-full border px-10 py-3 text-[11px] uppercase tracking-[0.32em] transition ${
                          isSelected
                            ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                            : "border-[hsl(var(--gold))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
                        }`}
                      >
                        {isSelected ? tier.selected : tier.cta}
                      </button>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="apply" className="relative px-6 pb-36 pt-12">
        <div className="mx-auto max-w-2xl">
          <SectionHead eyebrow={a.formTitle} />
          <FadeIn delay={0.1}>
            <p className="mt-10 text-center font-serif text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
              {a.formIntro}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-12 flex flex-col items-center gap-3 rounded-[2px] border border-[hsl(var(--border))] bg-[hsl(var(--background))/0.4] px-8 py-6 text-center">
              <span className="text-[10px] uppercase tracking-[0.34em] text-[hsl(var(--gold))]">
                {a.tierLabel}
              </span>
              {selectedTierData ? (
                <span
                  data-testid="selected-tier"
                  className="font-serif text-lg text-[hsl(var(--foreground))] md:text-xl"
                >
                  {selectedTierData.name} · {selectedTierData.price}
                </span>
              ) : (
                <a
                  href="#tiers"
                  className="font-serif text-base italic text-[hsl(var(--ink-mute))] underline-offset-8 hover:text-[hsl(var(--foreground))] hover:underline md:text-lg"
                >
                  {a.tierPlaceholder}
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form
              onSubmit={onSubmit}
              className="mt-14 space-y-10"
              data-testid="form-access"
              noValidate
            >
              <div className="grid gap-10 md:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>{a.fields.firstName} *</span>
                  <input
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className={inputClass}
                    data-testid="input-firstName"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>{a.fields.lastName} *</span>
                  <input
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className={inputClass}
                    data-testid="input-lastName"
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>{a.fields.project} *</span>
                <textarea
                  name="project"
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                  data-testid="input-project"
                />
              </label>

              <div className="grid gap-10 md:grid-cols-3">
                <label className="block">
                  <span className={labelClass}>{a.fields.instagram}</span>
                  <input
                    name="instagram"
                    type="text"
                    className={inputClass}
                    placeholder="@"
                    data-testid="input-instagram"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>{a.fields.telegram}</span>
                  <input
                    name="telegram"
                    type="text"
                    className={inputClass}
                    placeholder="@"
                    data-testid="input-telegram"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>{a.fields.whatsapp}</span>
                  <input
                    name="whatsapp"
                    type="tel"
                    className={inputClass}
                    placeholder="+"
                    data-testid="input-whatsapp"
                  />
                </label>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col items-center gap-6 pt-4">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  data-testid="button-submit"
                  className="rounded-full border border-[hsl(var(--gold))] px-10 py-3 text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[hsl(var(--foreground))]"
                >
                  {status === "submitting" ? a.submitting : a.submit}
                </button>

                {status === "success" ? (
                  <p
                    data-testid="form-success"
                    className="text-center font-serif text-base italic text-[hsl(var(--foreground))]"
                  >
                    {a.success}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p
                    data-testid="form-error"
                    className="text-center font-serif text-base italic text-[hsl(var(--ink-soft))]"
                  >
                    {a.errorMsg}
                  </p>
                ) : null}
              </div>
            </form>
          </FadeIn>
        </div>
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
