import { CSSProperties } from "react";

// Asset-free "logo wall" — each name is set in a different typeface so it reads
// as a row of distinct marks (the brand's multi-font marquee). Repurposed here
// for the self-hosted + on-chain stack Vértice builds on.
const STACK: { name: string; style: CSSProperties }[] = [
  { name: "Supabase", style: { fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 } },
  { name: "Coolify", style: { fontFamily: "Georgia, serif", fontWeight: 700, fontStyle: "italic" } },
  { name: "Ethereum", style: { fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" } },
  { name: "Chainlink", style: { fontFamily: "Impact, sans-serif", letterSpacing: "0.02em" } },
  { name: "ENS", style: { fontFamily: "'Courier New', monospace", fontWeight: 700 } },
  { name: "n8n", style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 } },
  { name: "Traefik", style: { fontFamily: "Georgia, serif", fontWeight: 400 } },
  { name: "Cloudflare", style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 } },
  { name: "Base", style: { fontFamily: "Impact, sans-serif" } },
  { name: "Arbitrum", style: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 } },
  { name: "Synology", style: { fontFamily: "Georgia, serif", fontWeight: 700 } },
  { name: "React", style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontStyle: "italic" } },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {STACK.map((s) => (
        <span key={s.name} style={s.style} className="text-2xl md:text-3xl text-slate/70 whitespace-nowrap select-none">
          {s.name}
        </span>
      ))}
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section className="py-16 md:py-24 border-y border-white/5">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-slate/60 mb-10">
        Built on infrastructure we own
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
