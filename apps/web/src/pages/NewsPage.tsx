import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Rss, Check } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { VerticeMark } from "../components/VerticeMark";
import { LanguageToggle } from "../components/LanguageToggle";
import { API, useText } from "../content/ContentContext";
import { useLang } from "../content/LanguageContext";

type Issue = { id: string; subject: string; excerpt: string; body: string; lang: string; sentAt: string | null };
type FeedItem = { title: string; link: string; date: string; excerpt: string };

export function NewsPage() {
  const { lang } = useLang();
  const heading = useText("news.heading");
  const sub = useText("news.sub");
  const subLabel = useText("news.subscribeLabel");
  const subPlaceholder = useText("news.subscribePlaceholder");
  const subCta = useText("news.subscribeCta");
  const subThanks = useText("news.subscribeThanks");
  const latestHeading = useText("news.latestHeading");
  const archiveHeading = useText("news.archiveHeading");
  const rssHeading = useText("news.rssHeading");
  const empty = useText("news.empty");

  const [issues, setIssues] = useState<Issue[]>([]);
  const [feed, setFeed] = useState<{ title: string; url: string; items: FeedItem[] }>({ title: "", url: "", items: [] });
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API}/news/latest?lang=${lang}`).then(r => r.json()).then(setIssues).catch(() => {});
    fetch(`${API}/news/rss-external`).then(r => r.json()).then(setFeed).catch(() => {});
  }, [lang]);

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (subState === "sending" || !email.trim()) return;
    setSubState("sending");
    try {
      const r = await fetch(`${API}/news/subscribe`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, lang }) });
      setSubState(r.ok ? "done" : "error");
    } catch { setSubState("error"); }
  };

  const featured = issues[0];
  const previous = issues.slice(1);
  const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", { year: "numeric", month: "short", day: "numeric" }) : "");

  return (
    <main style={{ background: "#0C0D11", minHeight: "100vh" }} className="text-paper">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <VerticeMark size={26} />
          <span className="font-display font-medium tracking-tight text-[15px] text-paper">Vértice<span className="text-slate"> Criativo</span></span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-sm text-slate hover:text-paper transition-colors"><ArrowLeft className="h-4 w-4" /> Home</Link>
          <LanguageToggle />
        </div>
      </div>

      {/* Header */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-10 max-w-4xl mx-auto text-center">
        <FadeIn as="h1" y={20} className="font-display font-medium tracking-tightest text-5xl sm:text-6xl md:text-7xl text-paper">{heading}</FadeIn>
        <FadeIn as="p" delay={0.1} className="mt-5 font-serif italic text-slate text-lg md:text-xl">{sub}</FadeIn>

        {/* Subscribe */}
        <FadeIn delay={0.2} className="mt-10">
          {subState === "done" ? (
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brassLight/30 bg-emerald-400/5 px-5 py-2.5 text-sm text-emerald-300">
              <Check className="h-4 w-4" /> {subThanks}
            </div>
          ) : (
            <form onSubmit={subscribe} className="mx-auto flex max-w-md items-center gap-2">
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={subPlaceholder}
                aria-label={subLabel}
                className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-paper placeholder-slate/50 outline-none focus:border-brassLight/50"
              />
              <button type="submit" disabled={subState === "sending"} className="rounded-full bg-brass px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brassLight hover:text-deepink disabled:opacity-50">
                {subCta}
              </button>
            </form>
          )}
          {subState === "error" && <p className="mt-3 text-sm text-red-400">—</p>}
        </FadeIn>
      </section>

      {/* Latest newsletter */}
      <section className="px-6 md:px-10 pb-8 max-w-3xl mx-auto">
        {!featured ? (
          <div className="rounded-2xl border border-white/8 p-10 text-center text-slate/70">{empty}</div>
        ) : (
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brassLight/80">{latestHeading} · {fmt(featured.sentAt)}</p>
            <h2 className="mt-3 font-display font-medium tracking-tighter2 text-3xl sm:text-4xl text-paper">{featured.subject}</h2>
            <article className="news-body mt-6 text-slate leading-relaxed" dangerouslySetInnerHTML={{ __html: featured.body }} />
          </FadeIn>
        )}
      </section>

      {/* Previous issues */}
      {previous.length > 0 && (
        <section className="px-6 md:px-10 py-8 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate/60 mb-5">{archiveHeading}</p>
          <div className="space-y-3">
            {previous.map(i => (
              <div key={i.id} className="rounded-xl border border-white/8 p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-medium text-paper">{i.subject}</h3>
                  <span className="shrink-0 font-mono text-[11px] text-slate/50">{fmt(i.sentAt)}</span>
                </div>
                {i.excerpt && <p className="mt-2 text-sm text-slate/80">{i.excerpt}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSS feed */}
      <section className="px-6 md:px-10 py-12 md:py-16 max-w-3xl mx-auto border-t border-white/8">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate/60 inline-flex items-center gap-2"><Rss className="h-3.5 w-3.5" /> {feed.title || rssHeading}</p>
          <a href={`${API}/news/feed.xml`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-brassLight/90 hover:text-brassLight">
            RSS <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        {feed.items.length === 0 ? (
          <p className="text-sm text-slate/50">—</p>
        ) : (
          <div className="space-y-4">
            {feed.items.map((it, i) => (
              <a key={i} href={it.link} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-white/8 p-5 transition-colors hover:border-brassLight/40">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-medium text-paper group-hover:text-brassLight transition-colors">{it.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate/50 group-hover:text-brassLight" />
                </div>
                {it.excerpt && <p className="mt-2 text-sm text-slate/75 line-clamp-2">{it.excerpt}</p>}
                {it.date && <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-slate/40">{it.date}</p>}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <div className="px-6 md:px-10 py-10 max-w-6xl mx-auto border-t border-white/8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate hover:text-paper transition-colors"><ArrowLeft className="h-4 w-4" /> Vértice Criativo</Link>
      </div>
    </main>
  );
}
