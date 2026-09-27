import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionStyle,
  type Variants,
} from "framer-motion";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered entrance with variants                    */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  scale?: number;
  once?: boolean;
  duration?: number;
  as?: "div" | "span" | "li" | "section";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  x = 0,
  blur = true,
  scale = 1,
  once = true,
  duration = 0.9,
  as = "div",
}: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(12px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ------------------------------------------------------------------ */
/* SplitText — word-by-word mask reveal for headlines                  */
/* ------------------------------------------------------------------ */

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "115%", opacity: 0, rotate: 4 }}
            whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
            viewport={{ once, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Character-by-character hover wave — used for big kinetic headings. */
export function KineticText({
  text,
  className,
  charClassName,
}: {
  text: string;
  className?: string;
  charClassName?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <span className={cn("inline-flex", className)} onMouseLeave={() => setHovered(null)}>
      {text.split("").map((char, i) => {
        const distance = hovered === null ? 99 : Math.abs(hovered - i);
        return (
          <motion.span
            key={`${char}-${i}`}
            className={cn("inline-block will-change-transform", charClassName)}
            onMouseEnter={() => setHovered(i)}
            animate={{
              y: distance === 0 ? -16 : distance === 1 ? -8 : distance === 2 ? -3 : 0,
              scale: distance === 0 ? 1.12 : 1,
              color: distance === 0 ? "#ffffff" : undefined,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.5 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper — element leans toward the cursor                   */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 160,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 20, mass: 0.4 });

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      const falloff = Math.max(0, 1 - dist / radius);
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    },
    [radius, strength, x, y],
  );

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — 3D tilt following the pointer with a moving glare         */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className,
  intensity = 9,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  style?: MotionStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 190, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 190, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,255,255,0.16), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("perspective", className)}
      style={style}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div className="preserve-3d relative h-full w-full" style={{ rotateX: rx, rotateY: ry }}>
        {children}
        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light transition-opacity duration-300"
            style={{ background, opacity: hover ? 1 : 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SpotCard — cursor-tracking spotlight used across sections            */
/* ------------------------------------------------------------------ */

export function SpotCard({
  children,
  className,
  accent = "#6c5cff",
  style,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const [active, setActive] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, ${accent}22, transparent 62%)`;
  const border = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, ${accent}aa, transparent 65%)`;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={cn("group relative overflow-hidden rounded-3xl", className)}
      style={style}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background, opacity: active ? 1 : 0 }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px transition-opacity duration-300"
        style={{
          background: border,
          opacity: active ? 1 : 0,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — animated number that counts up when scrolled into view     */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 1.8,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — infinite ribbon, speed reacts to scroll direction           */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  reverse = false,
  speed = 26,
  className,
  pauseOnHover = false,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  const items = Children.toArray(children);
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn("flex w-max shrink-0 items-center", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex items-center">{items}</div>
        <div className="flex items-center" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionShell + heading — consistent editorial layout for sections    */
/* ------------------------------------------------------------------ */

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-mist uppercase">
      <span className="text-brand">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "items-center text-center", "flex flex-col gap-6", className)}>
      <Reveal y={18} duration={0.7}>
        <SectionLabel index={index}>{label}</SectionLabel>
      </Reveal>
      <div className={cn("flex max-w-4xl flex-col gap-5", align === "center" && "items-center")}>
        <h2 className="text-4xl leading-[0.95] font-semibold text-balance sm:text-6xl lg:text-7xl">
          <SplitWords text={title} />
          {accent && (
            <>
              {" "}
              <span className="font-editorial text-brand-2 italic">
                <SplitWords text={accent} delay={0.12} />
              </span>
            </>
          )}
        </h2>
        {description && (
          <Reveal delay={0.15} y={20} className="max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            <p>{description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
