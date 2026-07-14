import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { VerticeMark } from "../components/VerticeMark";
import { useContent, Card } from "../content/ContentContext";

function Tile({ p }: { p: Card }) {
  return (
    <a
      href={`#${p.slug}`}
      className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/8 transition-colors duration-300 hover:border-brassLight/50"
      style={{ width: 360, height: 230, background: "#191B21" }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(circle at 70% 25%, ${p.accent ?? "#A15E1E"}33 0%, transparent 60%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <VerticeMark size={120} />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brassLight/80">{p.category}</p>
          <p className="font-display font-medium text-lg tracking-tight text-paper">{p.name}</p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-paper transition-transform duration-200 group-hover:rotate-45 group-hover:bg-brass">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

// A row scrolled horizontally by page-scroll position (tiled for a seamless run).
function Row({ shift, work }: { shift: number; work: Card[] }) {
  const tiles = [...work, ...work, ...work, ...work];
  return (
    <div className="flex gap-4" style={{ transform: `translateX(${shift}px)`, willChange: "transform" }}>
      {tiles.map((p, i) => (
        <Tile key={`${p.slug}-${i}`} p={p} />
      ))}
    </div>
  );
}

export function WorkMarqueeSection() {
  const { cards } = useContent();
  const work = cards.work;
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      setOffset((window.scrollY - el.offsetTop + window.innerHeight) * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shift = offset - 200;

  return (
    <section ref={sectionRef} className="overflow-hidden py-10 md:py-14">
      <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <Row shift={shift} work={work} />
        <Row shift={-shift} work={work} />
      </div>
    </section>
  );
}
