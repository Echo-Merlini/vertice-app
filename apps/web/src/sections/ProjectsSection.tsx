import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { VerticeMark } from "../components/VerticeMark";
import { useContent, Card } from "../content/ContentContext";

const radius = "rounded-[32px] sm:rounded-[40px]";

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: Card;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const accent = project.accent ?? "#A15E1E";

  return (
    <div id={project.slug} className="h-[86vh] flex items-center justify-center sticky top-24 md:top-28 scroll-mt-24">
      <motion.div
        style={{ scale, top: `${index * 26}px`, position: "relative", background: "#0C0D11" }}
        className={`w-full max-w-5xl border border-white/10 p-5 sm:p-7 md:p-9 ${radius}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-9 items-stretch">
          {/* Copy */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span
                className="font-display font-medium leading-none text-slate/40"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
              >
                {project.n}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brassLight/80">
                {project.category}
              </span>
            </div>
            <h3
              className="mt-4 font-display font-medium tracking-tight text-paper"
              style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.7rem)" }}
            >
              {project.name}
            </h3>
            <p className="mt-4 text-slate leading-relaxed max-w-md">{project.body}</p>
            <div className="mt-auto pt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Asset-free visual panel */}
          <div
            className={`relative overflow-hidden min-h-[220px] md:min-h-0 border border-white/8 ${radius}`}
            style={{ background: "#191B21" }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: `radial-gradient(circle at 70% 30%, ${accent}33 0%, transparent 60%)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              <VerticeMark size={150} />
            </div>
            <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate/50">
              Vértice · {project.category}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const { cards } = useContent();
  const work = cards.work;
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="px-6 md:px-10 pb-24">
      <div ref={container} className="relative">
        {work.map((project, i) => {
          const targetScale = 1 - (work.length - 1 - i) * 0.03;
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i / work.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
