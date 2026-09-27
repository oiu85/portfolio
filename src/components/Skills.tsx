import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHeading, Marquee } from "@/components/ui";
import { orbitSkills, skillGroups } from "@/data/portfolio";
import { cn } from "@/utils/cn";

/* ---------------- orbit visual ---------------- */

function Orbit() {
  const rings = [0, 1, 2];
  const outer = orbitSkills.slice(0, 9);
  const inner = orbitSkills.slice(9, 18);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(108,92,255,0.28),transparent_66%)] blur-2xl" />

      {rings.map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-white/8"
          style={{
            inset: `${7 + r * 11}%`,
            borderStyle: r === 1 ? "dashed" : "solid",
            background:
              r === 1 ? "radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)" : undefined,
          }}
        />
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <div className="glass relative grid h-[40%] w-[40%] place-items-center rounded-full">
          <div className="animate-spin-slower absolute inset-0 rounded-full border-t-2 border-brand/60" />
          <div className="text-center">
            <p className="text-grad font-display text-4xl font-bold">5+</p>
            <p className="font-mono text-[9px] tracking-[0.22em] text-mist uppercase">years deep</p>
          </div>
        </div>
      </div>

      {[
        { items: outer, fraction: 0.92, duration: 62, dir: 1, tone: "text-fog" },
        { items: inner, fraction: 0.7, duration: 84, dir: -1, tone: "text-mist" },
      ].map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute inset-0"
          animate={{ rotate: 360 * ring.dir }}
          transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
        >
          {ring.items.map((skill, i) => {
            const angle = ((360 / ring.items.length) * i - 90) * (Math.PI / 180);
            const x = 50 + Math.cos(angle) * ring.fraction * 50;
            const y = 50 + Math.sin(angle) * ring.fraction * 50;
            return (
              <span
                key={skill}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <motion.span
                  className={cn(
                    "glass block rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300 hover:text-aqua",
                    ring.tone,
                  )}
                  animate={{ rotate: -360 * ring.dir }}
                  transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
                >
                  {skill}
                </motion.span>
              </span>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- bars ---------------- */

function SkillBar({ name, level, accent, delay }: { name: string; level: number; accent: string; delay: number }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-fog">{name}</span>
        <span className="font-mono text-[10px] tracking-wider text-mist tabular-nums">{level}%</span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #ffffff55)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

const accents = ["#6c5cff", "#b98bff", "#35e0e0", "#ffc860"];

export default function Skills() {
  const [tab, setTab] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((g) => g.id === tab) ?? skillGroups[0];

  const { scrollYProgress } = useScroll();
  const outlineX = useTransform(scrollYProgress, [0, 1], ["2%", "-12%"]);

  return (
    <section id="skills" className="relative z-10 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="04"
          label="Capability"
          title="A toolkit tuned for"
          accent="shipping"
          align="center"
          description="Deep on mobile and architecture, fluent across the AI stack that surrounds it — so features land end-to-end instead of stopping at the hand-off."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal y={40}>
            <Orbit />
          </Reveal>

          <div>
            {/* tabs */}
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto pb-1">
              {skillGroups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setTab(g.id)}
                  data-cursor="hover"
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
                    tab === g.id ? "text-ink" : "text-mist hover:text-fog",
                  )}
                >
                  {tab === g.id && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-full bg-fog"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{g.label}</span>
                </button>
              ))}
            </div>

            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-3xl border border-white/8 bg-white/[0.02] p-6 sm:p-8"
            >
              <p className="max-w-md text-sm leading-relaxed text-mist">{activeGroup.blurb}</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-x-10">
                {activeGroup.items.map((item, i) => (
                  <SkillBar
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    accent={accents[skillGroups.findIndex((g) => g.id === activeGroup.id) % accents.length]}
                    delay={i * 0.07}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Response time", v: "< 24h" },
                { k: "Code reviews", v: "Always" },
                { k: "Documentation", v: "Included" },
              ].map((row, i) => (
                <Reveal key={row.k} delay={i * 0.06} y={18}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase">{row.k}</p>
                    <p className="mt-1 font-display text-lg font-semibold">{row.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div className="mt-20 border-y border-white/8 py-6" style={{ x: outlineX }}>
        <Marquee speed={44} reverse>
          {["Clean Architecture", "Pixel discipline", "Performance budgets", "Accessibility", "Motion systems"].map(
            (word) => (
              <span key={word} className="flex items-center gap-8 px-8">
                <span className="outline-text font-display text-2xl font-semibold tracking-tight whitespace-nowrap sm:text-4xl">
                  {word}
                </span>
                <span className="h-2 w-2 rounded-full bg-brand/60" />
              </span>
            ),
          )}
        </Marquee>
      </motion.div>
    </section>
  );
}
