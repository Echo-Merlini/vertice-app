import { Check } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { BrassButton } from "../components/BrassButton";

export function FlagshipSection() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <FadeIn x={-24} y={0}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brassLight/80">Flagship · Products</p>
          <h2 className="mt-4 font-display font-medium tracking-tighter2 text-4xl sm:text-5xl md:text-6xl text-paper">
            clock-in.pt
          </h2>
          <p className="mt-4 font-serif italic text-slate text-lg md:text-xl">Time &amp; attendance, made verifiable.</p>
          <p className="mt-5 text-slate leading-relaxed max-w-md">
            B2B SaaS for workforce time management — with{" "}
            <span className="text-paper">tamper-evident, recomputable</span> time records. Anyone can re-derive a record
            from its primary data; nobody has to trust the dashboard. Remake targeting September 2026.
          </p>
          <div className="mt-8">
            <BrassButton href="https://clock-in.pt" variant="ghost">
              Visit clock-in.pt
            </BrassButton>
          </div>
        </FadeIn>

        {/* Asset-free "verifiable record" card */}
        <FadeIn x={24} y={0} delay={0.1}>
          <div className="rounded-3xl border border-white/8 bg-ink/50 p-6 md:p-8 font-mono text-sm">
            <div className="flex items-center justify-between text-slate/60 text-xs">
              <span>record · #48213</span>
              <span className="flex items-center gap-1.5 text-emerald-400/90">
                <Check className="h-3.5 w-3.5" /> recomputed
              </span>
            </div>
            <div className="mt-5 space-y-2.5 text-slate">
              <div className="flex justify-between gap-4">
                <span className="text-slate/60">worker</span>
                <span className="text-paper">t.ferrão</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate/60">clock-in</span>
                <span className="text-paper">2026-07-14 09:02:11</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate/60">clock-out</span>
                <span className="text-paper">2026-07-14 17:48:03</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate/60">duration</span>
                <span className="text-paper">08:45:52</span>
              </div>
            </div>
            <div className="mt-5 border-t border-white/8 pt-4">
              <p className="text-slate/50 text-xs">sha256(record)</p>
              <p className="mt-1 break-all text-brassLight/90 text-[13px] leading-relaxed">
                0x9f2c·a71e·4db0·8c33·e615·72fa·1c9d·40b7
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
