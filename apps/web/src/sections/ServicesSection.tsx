import { FadeIn } from "../components/FadeIn";

type Service = {
  id: string;
  n: string;
  name: string;
  desc: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    id: "services",
    n: "01",
    name: "Technical AV",
    desc: "Billable AV & engineering from a bench of senior technicians on call — FOH, mastering, broadcast. We put a roster on the job, not one name.",
    tags: ["FOH", "Mastering", "Broadcast", "Training"],
  },
  {
    id: "events",
    n: "02",
    name: "Turnkey Events",
    desc: "From venue to final bow. Top-tier venues secured through 20+ years of relationships, assembled with a partner-equipment network — end to end.",
    tags: ["Venues", "Production", "Staging", "Lighting"],
  },
  {
    id: "products",
    n: "03",
    name: "Products",
    desc: "Productized software with recurring revenue — clock-in.pt, PWA Push, commercial MCPs, n8n automation — plus bespoke builds for clients.",
    tags: ["SaaS", "MCPs", "Automation", "Bespoke"],
  },
  {
    id: "crypto",
    n: "04",
    name: "On-chain AI",
    desc: "Verifiable, recomputable on-chain AI — the Recompute Kit, attested autonomous agents, specialized MCPs, and A2A micro-payments.",
    tags: ["Recompute Kit", "Agents", "CCIP", "A2A"],
  },
];

export function ServicesSection() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
      <FadeIn as="h2" className="font-display font-medium tracking-tighter2 text-4xl sm:text-5xl md:text-6xl text-paper">
        Four disciplines,<br />
        <span className="text-slate">one vértice.</span>
      </FadeIn>
      <FadeIn as="p" delay={0.1} className="mt-5 font-serif italic text-slate text-lg md:text-xl max-w-xl">
        Commercial products and technical services, delivered on infrastructure we own.
      </FadeIn>

      <div className="mt-14 md:mt-20">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.id} delay={i * 0.08}>
            <div
              id={s.id}
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
                <p className="mt-3 text-slate leading-relaxed max-w-2xl">{s.desc}</p>
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
