import { FadeIn } from "../components/FadeIn";
import { VerticeMark } from "../components/VerticeMark";
import { ContactForm } from "../components/ContactForm";
import { useText } from "../content/ContentContext";

const NAV = [
  ["Services", "#services"],
  ["Events", "#events"],
  ["Products", "#products"],
  ["Crypto / AI", "#crypto"],
];

// Company email is still TBD (events@ / hello@ on the Vértice domain) — wired to
// the founder's address for now so the CTA works.
const EMAIL = "hello@vertice.pt";

export function ContactSection() {
  const heading1 = useText("contact.heading1");
  const heading2 = useText("contact.heading2");
  const sub = useText("contact.sub");
  return (
    <footer id="contact" className="border-t border-white/8 px-6 md:px-10 pt-24 md:pt-32 pb-10">
      {/* CTA */}
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <VerticeMark size={64} spin className="mx-auto mb-8 opacity-90" />
        </FadeIn>
        <FadeIn as="h2" delay={0.05} y={20} className="font-display font-medium tracking-tighter2 text-4xl sm:text-5xl md:text-6xl text-paper">
          {heading1}<br className="hidden sm:block" /> <span className="brass-text">{heading2}</span>
        </FadeIn>
        <FadeIn as="p" delay={0.15} className="mt-6 font-serif italic text-slate text-lg md:text-xl">
          {sub}
        </FadeIn>
        <FadeIn delay={0.3} className="mt-10">
          <ContactForm />
        </FadeIn>
        <FadeIn delay={0.4} className="mt-5">
          <p className="text-sm text-slate/70">
            or email{" "}
            <a href={`mailto:${EMAIL}`} className="text-brassLight/90 hover:text-brassLight underline underline-offset-2">
              {EMAIL}
            </a>
          </p>
        </FadeIn>
      </div>

      {/* Footer bar */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32 pt-8 border-t border-white/8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <VerticeMark size={24} />
            <span className="font-display font-medium tracking-tight text-paper">Vértice Criativo</span>
          </a>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV.map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-slate hover:text-paper transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="font-mono text-[11px] leading-relaxed text-slate/60">
            VÉRTICE CRIATIVO — UNIPESSOAL LDA · NIPC 519525450
            <br />
            Amadora, Portugal · Don&apos;t trust. Recompute.
          </p>
          <p className="font-mono text-[11px] text-slate/50">
            Open primitives, CC0 →{" "}
            <a href="https://trustless-ai.com" className="text-brassLight/80 hover:text-brassLight">
              trustless-ai.com
            </a>
            <br />© {new Date().getFullYear()} Vértice Criativo
          </p>
        </div>
      </div>
    </footer>
  );
}
