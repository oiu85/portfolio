import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Layers, Star, Target, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal, SectionHeading, SplitWords, TiltCard } from "@/components/ui";
import { profile, projects, type Project } from "@/data/portfolio";
import { scrollToId, stopScroll, useMediaQuery } from "@/hooks";
import { cn } from "@/utils/cn";
import { externalLinkProps } from "@/utils/links";

/* ================================================================== */
/* Case-study modal                                                    */
/* ================================================================== */

function CaseStudy({ project, onClose, onNext }: { project: Project; onClose: () => void; onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const barScale = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useEffect(() => {
    stopScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      stopScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/85 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-ink-2 sm:rounded-[2rem]"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand to-aqua" style={{ scaleX: barScale }} />

        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-5 right-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-ink/70 text-fog backdrop-blur transition-colors hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div ref={ref} className="no-scrollbar overflow-y-auto overscroll-contain">
          {/* hero */}
          <div className="relative h-64 overflow-hidden sm:h-80">
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="rounded-full px-3 py-1" style={{ background: `${project.accent}22`, color: project.accent }}>
                  {project.category}
                </span>
                <span className="text-mist">{project.year}</span>
                <span className="text-mist">· {project.role}</span>
                <span className="flex items-center gap-1 text-amber">
                  {project.stars}
                  <Star className="h-3 w-3 fill-current" />
                </span>
              </div>
              <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h3>
              <p className="mt-1 font-editorial text-lg text-brand-2 italic">{project.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="flex flex-col gap-8">
              <p className="text-lg leading-relaxed text-fog/90">{project.summary}</p>
              <div>
                <h4 className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-mist uppercase">
                  <Target className="h-3.5 w-3.5" /> The story
                </h4>
                <p className="mt-3 leading-relaxed text-mist">{project.story}</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-mist uppercase">
                  <Layers className="h-3.5 w-3.5" /> What was built
                </h4>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                      className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-snug text-fog/90"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="flex flex-col gap-7">
              <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Impact</p>
                <div className="mt-4 flex flex-col gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="hairline pb-3 last:border-0">
                      <p className="font-display text-2xl font-semibold" style={{ color: project.accent }}>
                        {m.value}
                      </p>
                      <p className="text-[11px] tracking-wide text-mist">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-wider text-fog/85">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    {...externalLinkProps(l.url)}
                    className="flex items-center justify-between rounded-full border border-white/12 px-4 py-3 text-sm transition-colors hover:border-white/35 hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2">
                      {l.url.includes("github") ? <GithubIcon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                      {l.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <button
            onClick={onNext}
            className="group flex w-full items-center justify-between border-t border-white/8 px-6 py-6 text-left transition-colors hover:bg-white/[0.03] sm:px-9"
          >
            <span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Next project</span>
              <span className="mt-1 block font-display text-xl font-semibold">Keep exploring</span>
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-transform duration-500 group-hover:translate-x-1.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================== */
/* Wheel frame                                                         */
/* ================================================================== */

function WheelFrame({
  project,
  index,
  active,
  step,
  radius,
  compact,
  onSelect,
}: {
  project: Project;
  index: number;
  active: number;
  step: number;
  radius: number;
  compact: boolean;
  onSelect: (i: number) => void;
}) {
  const diff = ((index - active + 540) % 360) - 180;
  const abs = Math.abs(diff);
  const isFront = abs < 1;
  const opacity = isFront ? 1 : abs <= 61 ? (compact ? 0.3 : 0.68) : 0;
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[min(78vw,22rem)] sm:w-[26rem]"
      style={{
        transform: `translate(-50%, -50%) rotateY(${index * step}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      animate={{ opacity }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => onSelect(index)}
        data-cursor="hover"
        data-cursor-label={isFront ? "Open case" : "View"}
        aria-label={`${project.title} — ${isFront ? "open case study" : "focus project"}`}
        animate={{
          scale: isFront ? 1 : 0.86,
          filter: isFront ? "saturate(1) brightness(1)" : `saturate(0.5) brightness(0.45)`,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative block w-full overflow-hidden rounded-3xl border border-white/12 bg-ink-2 text-left"
        style={{ boxShadow: isFront ? `0 40px 120px -40px ${project.accent}` : "none" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          <span
            className="absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase backdrop-blur"
            style={{ background: `${project.accent}26`, color: project.accent }}
          >
            {project.category}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <h4 className="font-display text-xl font-semibold">{project.title}</h4>
            <p className="mt-0.5 text-[13px] text-mist">{project.subtitle}</p>
          </div>
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-transform duration-500",
              isFront ? "border-white/20 group-hover:translate-x-1" : "border-white/10",
            )}
            style={isFront ? { background: `${project.accent}22` } : undefined}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ================================================================== */
/* Work section                                                        */
/* ================================================================== */

export default function Work() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const total = projects.length;
  const step = 360 / total;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");
  const radius = isDesktop ? 520 : isTablet ? 400 : 300;

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  const dragStart = useRef<number | null>(null);
  const didDrag = useRef(false);
  const go = useCallback((dir: number) => setActive((a) => (a + dir + total) % total), [total]);
  const closeCase = useCallback(() => setOpenIndex(null), []);
  const nextCase = useCallback(() => setOpenIndex((i) => ((i ?? 0) + 1) % total), [total]);

  useEffect(() => {
    if (paused || openIndex !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, openIndex, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex !== null) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, go]);

  /* hover-following preview for the list */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const py = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });
  const vx = useVelocity(px);
  const rotate = useTransform(vx, [-2500, 0, 2500], [-9, 0, 9]);
  const skew = useTransform(vx, [-2500, 0, 2500], [4, 0, -4]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section id="work" className="relative z-10 overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Products that shipped,"
          accent="and stuck"
          description="Six projects that show the range — commerce, education, healthcare, desktop tooling and AI. Spin the carousel, or open the case studies for the engineering decisions behind them."
        />
      </div>

      {/* ---------- 3D carousel ---------- */}
      <div
        className="relative mt-16 sm:mt-20"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => {
          setPaused(false);
          dragStart.current = null;
        }}
        onPointerDown={(e) => {
          dragStart.current = e.clientX;
          didDrag.current = false;
        }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return;
          const delta = e.clientX - dragStart.current;
          if (Math.abs(delta) > 55) {
            didDrag.current = true;
            go(delta > 0 ? -1 : 1);
          }
          dragStart.current = null;
        }}
        onClickCapture={(e) => {
          // A swipe that ends over a card must not also open/focus that card.
          if (!didDrag.current) return;
          didDrag.current = false;
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="perspective relative h-[19rem] w-full sm:h-[26rem]" data-cursor="drag" data-cursor-label="Drag">
          <motion.div
            className="preserve-3d absolute top-1/2 left-1/2 h-0 w-0"
            animate={{ rotateY: -active * step }}
            transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}
          >
            {projects.map((p, i) => (
              <WheelFrame
                key={p.id}
                project={p}
                index={i}
                active={active}
                step={step}
                radius={radius}
                compact={!isDesktop}
                onSelect={(i2) => {
                  if (i2 === active) setOpenIndex(i2);
                  else setActive(i2);
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* reflection */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(108,92,255,0.18),transparent_70%)]" />

        {/* controls */}
        <div className="relative mx-auto mt-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous project"
              data-cursor="hover"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-white/35 hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next project"
              data-cursor="hover"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-white/35 hover:bg-white/5"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="ml-2 font-mono text-[11px] tracking-[0.2em] text-mist">
              <span className="text-fog">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`Show ${p.title}`}
                className="group relative h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 44 : 16,
                  background: i === active ? p.accent : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setOpenIndex(active)}
            data-cursor="hover"
            data-cursor-label="Case study"
            className="group flex items-center gap-2 rounded-full bg-fog px-5 py-3 text-[13px] font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Open case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ---------- editorial index ---------- */}
      <div className="mx-auto mt-24 w-full max-w-7xl px-6">
        <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            The full <span className="font-editorial text-brand-2 italic">index</span>
          </h3>
          <span className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">
            {visible.length} projects · hover to preview
          </span>
        </Reveal>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300",
                filter === cat
                  ? "border-transparent text-ink"
                  : "border-white/12 text-mist hover:border-white/30 hover:text-fog",
              )}
            >
              {filter === cat && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-2 to-aqua"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="border-t border-white/10">
          <AnimatePresence initial={false}>
          {visible.map((p) => {
            const i = projects.findIndex((x) => x.id === p.id);
            return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => setOpenIndex(i)}
                data-cursor="hover"
                data-cursor-label="Open"
                className="group relative flex w-full items-center gap-5 border-b border-white/10 py-6 text-left transition-colors hover:bg-white/[0.02] sm:gap-8"
              >
                <span className="font-mono text-[11px] text-mist transition-colors group-hover:text-brand-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block truncate text-[12.5px] text-mist">{p.subtitle}</span>
                </span>
                <span className="hidden shrink-0 items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-mist uppercase sm:flex">
                  <span>{p.category}</span>
                  <span>{p.year}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-amber">
                  {p.stars}
                  <Star className="h-3 w-3 fill-current" />
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 transition-all duration-500 group-hover:border-white/35 group-hover:bg-white/6">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
                />
              </button>
            </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-lg text-sm leading-relaxed text-mist">
            More experiments, packages and in-progress work live on GitHub — including shared Flutter modules I reuse
            across client projects.
          </p>
          <a
            href="https://github.com/oiu85"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium transition-colors hover:border-white/35 hover:bg-white/5"
          >
            <GithubIcon className="h-4 w-4" />
            Browse all repositories
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* spotlight call-to-action */}
      <div className="mx-auto mt-24 max-w-7xl px-6">
        <Reveal>
          <TiltCard intensity={5} className="w-full">
            <div className="panel noise-soft relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <div className="dot-grid absolute inset-0 opacity-25" />
              <div className="relative flex flex-wrap items-center justify-between gap-8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.28em] text-mist uppercase">Currently available</p>
                  <h3 className="mt-3 max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">
                    <SplitWords text="Have a product that deserves to feel" />{" "}
                    <span className="font-editorial text-brand-2 italic">
                      <SplitWords text="effortless?" delay={0.08} />
                    </span>
                  </h3>
                </div>
                <button
                  onClick={() => scrollToId("contact")}
                  data-cursor="hover"
                  data-cursor-label="Contact"
                  className="shine group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-brand via-brand-2 to-aqua px-6 py-4 text-sm font-semibold text-ink"
                >
                  <span className="shine-bar" />
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className="relative mt-6 max-w-xl text-sm text-mist">{profile.availability}</p>
            </div>
          </TiltCard>
        </Reveal>
      </div>

      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[45] hidden lg:block"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/12"
              style={{ rotate, skewX: skew, width: 320 }}
            >
              <img src={projects[hovered].image} alt="" className="h-[200px] w-full object-cover" />
              <div className="flex items-center justify-between gap-2 bg-ink/85 px-3 py-2 backdrop-blur">
                <span className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">
                  {projects[hovered].title}
                </span>
                <span className="font-mono text-[9px] text-mist">{projects[hovered].year}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openIndex !== null && (
          <CaseStudy
            project={projects[openIndex]}
            onClose={closeCase}
            onNext={nextCase}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
