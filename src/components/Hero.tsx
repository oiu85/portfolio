import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Award, Download, MapPin, Sparkles } from "lucide-react";
import { Counter, KineticText, Magnetic, Marquee } from "@/components/ui";
import { marqueeWords, metrics, profile } from "@/data/portfolio";
import { scrollToId } from "@/hooks";

const chips = [
  { label: "Flutter", x: "2%", y: "16%", depth: 1.4, delay: "0s", accent: "#35e0e0" },
  { label: "Clean Architecture", x: "60%", y: "6%", depth: 1.1, delay: "-1.6s", accent: "#6c5cff" },
  { label: "AI Systems", x: "70%", y: "40%", depth: 1.7, delay: "-3.1s", accent: "#b98bff" },
  { label: "Dart", x: "-4%", y: "58%", depth: 1.2, delay: "-2.2s", accent: "#7aa2ff" },
  { label: "Firebase", x: "8%", y: "84%", depth: 1.5, delay: "-4.4s", accent: "#ffc860" },
  { label: "60 fps", x: "72%", y: "76%", depth: 1.3, delay: "-0.8s", accent: "#b6f36a" },
];

function FloatChip({ chip, sx }: { chip: (typeof chips)[number]; sx: MotionValue<number> }) {
  const tx = useTransform(sx, [0, 1], [16 * chip.depth, -16 * chip.depth]);
  // The CSS float animation lives on the inner element: a keyframed `transform`
  // would otherwise override the parallax transform Framer Motion writes here.
  return (
    <motion.div style={{ translateZ: `${60 * chip.depth}px`, translateX: tx }}>
      <div
        className="animate-float-slow glass flex items-center gap-2 rounded-2xl px-3.5 py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)]"
        style={{ animationDelay: chip.delay }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: chip.accent }} />
        <span className="font-mono text-[10px] tracking-[0.16em] whitespace-nowrap text-fog uppercase">
          {chip.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [0, 1], [-13, 13]);
  const rotateX = useTransform(sy, [0, 1], [11, -11]);
  const shiftX = useTransform(sx, [0, 1], [-22, 22]);
  const shiftY = useTransform(sy, [0, 1], [-16, 16]);
  const glowX = useTransform(sx, [0, 1], ["18%", "82%"]);
  const glowY = useTransform(sy, [0, 1], ["12%", "88%"]);
  const stageGlow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(108,92,255,0.28), transparent 62%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)));
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-between pt-28 pb-10 sm:pt-32"
    >
      <motion.div
        className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ---------------- copy ---------------- */}
        <div className="relative z-10 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="glass flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-lime" />
                <span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-fog/90 uppercase">
                {profile.availability}
              </span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="mb-4 font-mono text-[11px] tracking-[0.34em] text-brand-2 uppercase"
            >
              {profile.role} · {profile.tagline}
            </motion.p>
            <h1 className="text-[13vw] leading-[0.86] font-semibold tracking-[-0.045em] sm:text-[9vw] lg:text-[6.4rem]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.15, ease, delay: 0.28 }}
                >
                  Mobile apps
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-mist"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.15, ease, delay: 0.4 }}
                >
                  engineered to
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block font-editorial italic"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1.15, ease, delay: 0.52 }}
                >
                  <span className="text-grad">
                    <KineticText text="feel alive." />
                  </span>
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.66 }}
            className="max-w-xl text-[15px] leading-relaxed text-mist sm:text-base"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.78 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.3} radius={140}>
              <button
                onClick={() => scrollToId("work")}
                data-cursor="hover"
                data-cursor-label="See work"
                className="shine group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand via-brand-2 to-aqua px-6 py-3.5 text-sm font-semibold text-ink"
              >
                <span className="shine-bar" />
                <Sparkles className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Explore selected work</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.24} radius={120}>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-fog transition-colors hover:border-white/35"
              >
                <span className="absolute inset-0 -translate-y-full bg-fog/8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <Download className="relative z-10 h-4 w-4" />
                <span className="relative z-10">GitHub &amp; résumé</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* metric strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.95 }}
            className="mt-2 grid grid-cols-2 gap-y-6 border-t border-white/8 pt-6 sm:grid-cols-4 sm:gap-0"
          >
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`flex flex-col gap-1 sm:px-5 ${i > 0 ? "sm:border-l sm:border-white/8" : ""} ${
                  i === 0 ? "sm:pl-0" : ""
                }`}
              >
                <span className="font-display text-2xl font-semibold sm:text-3xl">
                  <Counter value={m.value} decimals={m.decimals ?? 0} suffix={m.suffix} />
                </span>
                <span className="text-[11px] leading-tight text-fog/80">{m.label}</span>
                <span className="font-mono text-[9px] tracking-wider text-mist/70">{m.detail}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------------- stage ---------------- */}
        <motion.div
          style={{ y: stageY, scale: stageScale }}
          className="perspective relative z-0 mx-auto w-full max-w-[30rem] lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(20px)" }}
            animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.3, ease, delay: 0.45 }}
            className="preserve-3d relative aspect-[4/4.6] w-full"
            style={{ rotateX, rotateY }}
          >
            {/* rotating conic halo */}
            <div
              className="animate-spin-slower absolute top-1/2 left-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[2px]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(108,92,255,0.75) 60deg, transparent 140deg, rgba(53,224,224,0.65) 220deg, transparent 300deg)",
                maskImage: "radial-gradient(circle, transparent 58%, black 60%, black 72%, transparent 74%)",
                WebkitMaskImage: "radial-gradient(circle, transparent 58%, black 60%, black 72%, transparent 74%)",
              }}
            />
            {/* orbit rings */}
            <svg
              viewBox="0 0 400 400"
              className="animate-spin-slow absolute inset-[-6%] h-[112%] w-[112%] opacity-40"
              fill="none"
            >
              <circle cx="200" cy="200" r="186" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 9" />
              <circle cx="200" cy="200" r="150" stroke="rgba(108,92,255,0.35)" strokeDasharray="40 260" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="212" stroke="rgba(53,224,224,0.25)" strokeDasharray="2 14" />
            </svg>

            {/* mouse-reactive glow */}
            <motion.div
              className="absolute inset-[-12%] rounded-full blur-2xl"
              style={{ background: stageGlow, translateZ: "-40px" }}
            />

            {/* portrait */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative h-full w-full">
                <div className="absolute inset-x-6 bottom-8 h-[52%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(108,92,255,0.45),transparent_66%)] blur-3xl" />
                <motion.div
                  className="mask-fade-b absolute inset-0 flex items-end justify-center"
                  style={{ translateX: shiftX, translateY: shiftY, translateZ: "60px" }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    draggable={false}
                    className="h-[102%] w-auto object-contain drop-shadow-[0_40px_80px_rgba(5,6,12,0.9)] select-none"
                  />
                </motion.div>
                {/* hologram sweep */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
                  <div className="animate-shine absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-aqua/12 to-transparent" />
                </div>
              </div>
            </div>

            {/* floating tech chips */}
            {chips.map((c) => (
              <div key={c.label} className="absolute" style={{ left: c.x, top: c.y }}>
                <FloatChip chip={c} sx={sx} />
              </div>
            ))}

            {/* floating status card */}
            <motion.div
              className="glass absolute -bottom-2 -left-2 w-[15.5rem] rounded-3xl p-4 sm:left-0"
              style={{ translateZ: "110px" }}
              initial={{ opacity: 0, y: 26 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease, delay: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase">Now building</span>
              </div>
              <p className="mt-2 text-sm leading-snug font-medium">
                AI-assisted mobile tooling — streaming, grounded, token-thrifty.
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-aqua"
                  initial={{ width: "0%" }}
                  animate={ready ? { width: "72%" } : {}}
                  transition={{ duration: 1.6, delay: 1.3, ease }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------------- bottom band ---------------- */}
      <div className="relative z-10 mt-10 flex flex-col gap-6">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6">
          <button
            onClick={() => scrollToId("about")}
            data-cursor="hover"
            data-cursor-label="Scroll"
            className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-mist uppercase transition-colors hover:text-fog"
          >
            <span className="relative flex h-10 w-5 justify-center rounded-full border border-white/15">
              <span className="animate-scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-aqua" />
            </span>
            Scroll to explore
          </button>
          <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-mist uppercase sm:flex">
            Flutter · AI · Motion <ArrowDown className="h-3 w-3 animate-bounce" />
          </span>
        </div>

        <div className="-rotate-1 border-y border-white/8 bg-white/[0.015] py-3">
          <Marquee speed={34}>
            {marqueeWords.map((w) => (
              <span key={w} className="flex items-center gap-6 px-6">
                <span className="font-display text-lg font-medium tracking-tight text-fog/80">{w}</span>
                <span className="text-brand/70">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
