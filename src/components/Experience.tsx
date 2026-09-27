import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { experience, profile } from "@/data/portfolio";

const toneMap: Record<string, string> = {
  brand: "#6c5cff",
  aqua: "#35e0e0",
  amber: "#ffc860",
  violet: "#b98bff",
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const glowY = useTransform(line, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative z-10 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="05"
          label="The journey"
          title="Five years of"
          accent="compounding"
          description="From first published app to leading mobile delivery for content platforms and startups — a path built out of shipped work, not slide decks."
        />

        <div ref={ref} className="relative mt-20">
          {/* spine */}
          <div className="absolute top-0 left-[7px] h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-brand via-brand-2 to-aqua"
              style={{ scaleY: line }}
            />
            <motion.span
              className="absolute left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-2xl"
              style={{ top: glowY }}
            />
          </div>

          <div className="flex flex-col gap-14 sm:gap-20">
            {experience.map((job, i) => {
              const accent = toneMap[job.tone] ?? "#6c5cff";
              const left = i % 2 === 0;
              return (
                <div
                  key={job.period}
                  className={`relative grid gap-6 sm:grid-cols-2 sm:gap-12 ${left ? "" : "sm:[&>*:first-child]:order-2"}`}
                >
                  {/* card */}
                  <Reveal
                    x={0}
                    y={left ? 40 : 40}
                    duration={0.9}
                    className={`pl-8 sm:pl-0 ${left ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}
                  >
                    <div className="group relative rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] sm:p-7">
                      <span
                        className="absolute top-0 h-px w-16 opacity-70"
                        style={{
                          background: `linear-gradient(90deg, ${accent}, transparent)`,
                          [left ? "right" : "left"]: 0,
                        }}
                      />
                      <div
                        className={`flex flex-wrap items-center gap-2.5 ${left ? "sm:justify-end" : ""}`}
                      >
                        <span
                          className="rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                          style={{ background: `${accent}22`, color: accent }}
                        >
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl leading-tight font-semibold sm:text-[1.7rem]">
                        {job.role}
                      </h3>
                      <p
                        className={`mt-1 flex items-center gap-2 text-sm text-fog/80 ${
                          left ? "sm:justify-end" : ""
                        }`}
                      >
                        <Briefcase className="h-3.5 w-3.5" style={{ color: accent }} />
                        {job.org}
                      </p>
                      <p className={`mt-4 max-w-md text-sm leading-relaxed text-mist ${left ? "sm:ml-auto" : ""}`}>
                        {job.summary}
                      </p>
                      <ul className={`mt-5 flex flex-col gap-2.5 ${left ? "sm:items-end" : ""}`}>
                        {job.highlights.map((h) => (
                          <li
                            key={h}
                            className={`flex items-start gap-2.5 text-[13px] leading-snug text-fog/85 ${
                              left ? "sm:flex-row-reverse sm:text-right" : ""
                            }`}
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className={`mt-5 flex flex-wrap gap-2 ${left ? "sm:justify-end" : ""}`}>
                        {job.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-wider text-mist uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* node */}
                  <div className="pointer-events-none absolute top-8 left-0 sm:left-1/2 sm:-translate-x-1/2">
                    <motion.span
                      className="grid h-4 w-4 place-items-center rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-20% 0px" }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      style={{ background: accent }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    </motion.span>
                    <span
                      className="absolute inset-0 animate-pulse-ring rounded-full"
                      style={{ background: `${accent}66` }}
                    />
                  </div>

                  {/* year marker on the empty side */}
                  <div
                    className={`hidden items-start pt-6 sm:flex ${left ? "sm:order-2 sm:pl-10" : "sm:justify-end sm:pr-10"}`}
                  >
                    <span className="font-display text-5xl leading-none font-bold text-white/8 lg:text-7xl">
                      {job.period.slice(0, 4)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/8 bg-white/[0.02] p-7">
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Want the long version?</p>
            <p className="mt-2 max-w-lg text-sm text-fog/85">
              Full history, references and code samples are available on request — or browse the public repositories for
              a live look at how I work.
            </p>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium transition-colors hover:border-white/35 hover:bg-white/5"
          >
            Open GitHub profile
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
