import { FadeIn } from "../components/FadeIn";
import { VerticeMark } from "../components/VerticeMark";
import { BrassButton } from "../components/BrassButton";

const NAV = [
  ["Services", "#services"],
  ["Events", "#events"],
  ["Products", "#products"],
  ["Crypto / AI", "#crypto"],
  ["Contact", "#contact"],
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* brass glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #A15E1E 0%, transparent 70%)" }}
      />

      {/* Nav */}
      <FadeIn as="nav" y={-16} className="relative z-20 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <a href="#" className="flex items-center gap-2.5">
          <VerticeMark size={26} />
          <span className="font-display font-medium tracking-tight text-[15px] text-paper">
            Vértice<span className="text-slate"> Criativo</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium tracking-tight text-slate hover:text-paper transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Hero core */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pb-16">
        <FadeIn y={20}>
          <VerticeMark size={150} spin className="mb-6 drop-shadow-[0_8px_40px_rgba(224,162,76,0.15)]" />
        </FadeIn>

        <FadeIn as="h1" delay={0.1} y={24} className="font-display font-medium leading-[0.85] tracking-tightest">
          <span className="block whitespace-nowrap text-paper text-[19vw] sm:text-[16vw] md:text-[12rem] lg:text-[14rem]">
            Vértice
          </span>
          <span className="block brass-text text-[8.5vw] sm:text-[7vw] md:text-[4.75rem] lg:text-[5.5rem] tracking-tight -mt-1 md:-mt-3">
            Criativo
          </span>
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.25}
          y={16}
          className="mt-7 font-display font-medium text-lg sm:text-xl md:text-2xl tracking-tight text-slate"
        >
          Don&apos;t trust. <span className="brass-text">Recompute.</span>
        </FadeIn>

        <FadeIn delay={0.35} y={16} className="mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate/70">
          Technical AV · Turnkey Events · Products · On-chain AI
        </FadeIn>

        <FadeIn delay={0.5} y={16} className="mt-10">
          <BrassButton href="#contact">Start a project</BrassButton>
        </FadeIn>
      </div>
    </section>
  );
}
