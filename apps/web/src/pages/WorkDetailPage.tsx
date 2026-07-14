import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { VerticeMark } from "../components/VerticeMark";
import { BrassButton } from "../components/BrassButton";
import { API, imageUrl } from "../content/ContentContext";
import { useLang } from "../content/LanguageContext";
import { CardDetail } from "../content/defaults";

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const [card, setCard] = useState<CardDetail | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "notfound">("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
    let alive = true;
    setState("loading");
    fetch(`${API}/content/work/${slug}?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: CardDetail) => { if (alive) { setCard(d); setState("ready"); } })
      .catch(() => { if (alive) setState("notfound"); });
    return () => { alive = false; };
  }, [slug, lang]);

  const accent = card?.accent ?? "#A15E1E";
  const hero = imageUrl(card?.image);
  const gallery = (card?.gallery ?? []).map((g) => imageUrl(g)!).filter(Boolean);
  const paragraphs = (card?.detail ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <main style={{ background: "#0C0D11", minHeight: "100vh" }} className="text-paper">
      {/* Top bar */}
      <div className="px-6 md:px-10 pt-6 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate hover:text-paper transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Vértice
        </Link>
      </div>

      {state === "loading" && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <VerticeMark size={90} spin className="opacity-70" />
        </div>
      )}

      {state === "notfound" && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-6">
          <VerticeMark size={80} className="opacity-60" />
          <p className="font-display text-2xl text-paper">Project not found</p>
          <BrassButton href="/">Back to home</BrassButton>
        </div>
      )}

      {state === "ready" && card && (
        <>
          {/* Hero */}
          <section className="relative px-6 md:px-10 pt-14 md:pt-20 pb-16 md:pb-20 max-w-6xl mx-auto">
            <div
              className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full opacity-25 blur-[120px]"
              style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
            />
            <div className="relative">
              {card.category && (
                <FadeIn as="p" className="font-mono text-[11px] uppercase tracking-[0.25em] text-brassLight/80">
                  {card.category}
                </FadeIn>
              )}
              <FadeIn as="h1" delay={0.05} y={20} className="mt-4 font-display font-medium tracking-tightest text-paper text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
                {card.name}
              </FadeIn>
              {card.body && (
                <FadeIn as="p" delay={0.12} className="mt-6 font-serif italic text-slate text-lg md:text-2xl max-w-2xl">
                  {card.body}
                </FadeIn>
              )}

              {/* Meta row */}
              <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                {card.year && <Meta label="Year" value={card.year} />}
                {card.role && <Meta label="Role" value={card.role} />}
                {card.category && <Meta label="Discipline" value={card.category} />}
              </FadeIn>
            </div>

            {/* Hero visual */}
            <FadeIn delay={0.25} className="mt-12 md:mt-16">
              <div
                className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-white/10"
                style={{ background: "#191B21", aspectRatio: "16 / 9" }}
              >
                {hero ? (
                  <img src={hero} alt={card.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at 65% 30%, ${accent}33 0%, transparent 60%)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <VerticeMark size={200} className="opacity-90" />
                    </div>
                  </>
                )}
              </div>
            </FadeIn>
          </section>

          {/* Body */}
          <section className="px-6 md:px-10 pb-8 max-w-3xl mx-auto">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <FadeIn as="p" key={i} delay={0.03 * i} className="mb-6 text-slate leading-relaxed text-lg">
                  {p}
                </FadeIn>
              ))
            ) : (
              <p className="text-slate/60 italic">More detail coming soon.</p>
            )}

            {card.tags?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate/80">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {card.href && (
              <div className="mt-10">
                <BrassButton href={card.href} variant="ghost">
                  Visit <ArrowUpRight className="ml-1 inline h-4 w-4" />
                </BrassButton>
              </div>
            )}
          </section>

          {/* Gallery */}
          {gallery.length > 0 && (
            <section className="px-6 md:px-10 py-10 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {gallery.map((src, i) => (
                  <FadeIn key={i} delay={0.04 * i}>
                    <div className="overflow-hidden rounded-2xl border border-white/8" style={{ background: "#191B21" }}>
                      <img src={src} alt={`${card.name} — ${i + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="px-6 md:px-10 py-20 md:py-28 text-center">
            <FadeIn as="h2" className="font-display font-medium tracking-tighter2 text-3xl sm:text-4xl md:text-5xl text-paper">
              Want something like this?
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8 flex items-center justify-center gap-4">
              <BrassButton href="/#contact">Start a project</BrassButton>
              <Link to="/" className="text-sm text-slate hover:text-paper transition-colors">All work →</Link>
            </FadeIn>
          </section>
        </>
      )}
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate/50">{label}</p>
      <p className="mt-1 font-display text-paper">{value}</p>
    </div>
  );
}
