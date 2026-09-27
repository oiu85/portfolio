import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Quote, Sparkles, Wrench, Wand2, Phone } from "lucide-react";
import { Reveal, SectionHeading, SpotCard, SplitWords } from "@/components/ui";
import { process, profile, services } from "@/data/portfolio";

const icons = { phone: Phone, sparkles: Sparkles, wrench: Wrench, wand: Wand2 };

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cardY = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="about" className="relative z-10 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="02"
          label="The person behind the build"
          title="Engineering with"
          accent="obsessive taste"
          description="I'm a mobile engineer who treats software like a craft object: layered architecture underneath, tactile motion on top. Five years, thirty-plus shipped apps, one standard — it has to feel effortless."
        />

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* portrait column */}
          <div className="relative">
            <motion.div
              style={{ y: imgY, rotate }}
              className="panel relative overflow-hidden rounded-[2rem] p-5"
            >
              <div className="relative flex items-end justify-center overflow-hidden rounded-3xl bg-[radial-gradient(70%_60%_at_50%_30%,rgba(108,92,255,0.35),transparent_70%)]">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="animate-float-slow mask-fade-b h-[24rem] w-auto object-contain drop-shadow-[0_30px_60px_rgba(5,6,12,0.85)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-semibold">{profile.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">{profile.role}</p>
                </div>
                <span className="glass rounded-full px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-lime uppercase">
                  ● {profile.timezoneLabel}
                </span>
              </div>
            </motion.div>

            {/* floating quote card */}
            <motion.div
              style={{ y: cardY }}
              className="glass absolute -right-3 -bottom-10 w-64 rounded-3xl p-5 sm:-right-8"
            >
              <Quote className="h-5 w-5 text-brand-2" />
              <p className="mt-3 text-sm leading-snug text-fog/90">
                “Any app can work. The ones people love are the ones that answer back.”
              </p>
              <span className="mt-3 block font-mono text-[9px] tracking-[0.2em] text-mist uppercase">
                My working belief
              </span>
            </motion.div>
          </div>

          {/* copy column */}
          <div className="flex flex-col gap-8 lg:pt-6">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-relaxed text-mist sm:text-lg">
                  {i === 0 ? (
                    <>
                      <span className="float-left mr-3 font-editorial text-6xl leading-[0.75] text-grad">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              </Reveal>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Primary craft", value: "Flutter · Dart" },
                { label: "Force multiplier", value: "AI integration" },
                { label: "Obsession", value: "Motion & UX detail" },
                { label: "Working style", value: "Async, documented" },
              ].map((row, i) => (
                <Reveal key={row.label} delay={0.1 + i * 0.06} y={20}>
                  <div className="hairline flex items-baseline justify-between py-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">{row.label}</span>
                    <span className="font-display text-sm font-medium">{row.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* services */}
        <div className="mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">
              <SplitWords text="Four ways I plug into" />{" "}
              <span className="font-editorial text-brand-2 italic">
                <SplitWords text="your team" delay={0.1} />
              </span>
            </h3>
            <Reveal delay={0.1} className="max-w-sm text-sm leading-relaxed text-mist">
              <p>
                Every engagement starts with a scoped week of discovery so we both know the shape of the work before a
                single line lands on main.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = icons[service.icon as keyof typeof icons] ?? Sparkles;
              return (
                <Reveal key={service.title} delay={i * 0.09}>
                  <SpotCard accent={service.accent} className="h-full">
                    <div className="panel flex h-full flex-col gap-4 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1.5">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10"
                        style={{ background: `linear-gradient(140deg, ${service.accent}33, transparent)` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: service.accent }} />
                      </span>
                      <h4 className="font-display text-lg font-semibold">{service.title}</h4>
                      <p className="text-sm leading-relaxed text-mist">{service.blurb}</p>
                      <ul className="mt-auto flex flex-col gap-2 pt-2">
                        {service.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-[12.5px] text-fog/85">
                            <Check className="h-3.5 w-3.5 shrink-0" style={{ color: service.accent }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* process */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-32">
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase">How it happens</p>
            <h3 className="mt-4 max-w-xs text-3xl leading-tight font-semibold sm:text-4xl">
              A calm process
              <br />
              for loud goals.
            </h3>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] sm:grid-cols-2">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="group relative bg-ink/40 p-7">
                <span className="font-mono text-[11px] tracking-[0.2em] text-brand">{p.step}</span>
                <h4 className="mt-4 font-display text-2xl font-semibold">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
                <span className="absolute right-6 bottom-6 h-8 w-8 rounded-full border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
