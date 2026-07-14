import { FadeIn } from "../components/FadeIn";
import { useContent, useText } from "../content/ContentContext";

export function ServicesSection() {
  const { cards } = useContent();
  const services = cards.services;
  const heading1 = useText("services.heading1");
  const heading2 = useText("services.heading2");
  const sub = useText("services.sub");

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
      <FadeIn as="h2" className="font-display font-medium tracking-tighter2 text-4xl sm:text-5xl md:text-6xl text-paper">
        {heading1}<br />
        <span className="text-slate">{heading2}</span>
      </FadeIn>
      <FadeIn as="p" delay={0.1} className="mt-5 font-serif italic text-slate text-lg md:text-xl max-w-xl">
        {sub}
      </FadeIn>

      <div className="mt-14 md:mt-20">
        {services.map((s, i) => (
          <FadeIn key={s.slug} delay={i * 0.08}>
            <div
              id={s.slug}
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-4 md:gap-10 border-t border-white/8 py-8 md:py-12 scroll-mt-24 transition-colors duration-300 hover:border-brassLight/40"
            >
              <span
                className="font-display font-medium leading-none text-slate/40 transition-colors duration-300 group-hover:text-brassLight"
                style={{ fontSize: "clamp(3rem, 10vw, 8.5rem)" }}
              >
                {s.n}
              </span>
              <div className="md:pt-3">
                <h3
                  className="font-display font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
                >
                  {s.name}
                </h3>
                <p className="mt-3 text-slate leading-relaxed max-w-2xl">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div className="border-t border-white/8" />
      </div>
    </section>
  );
}
