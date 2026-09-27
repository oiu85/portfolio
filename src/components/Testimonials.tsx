import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import { faqs, testimonials } from "@/data/portfolio";
import { cn } from "@/utils/cn";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const dragStart = useRef<number | null>(null);

  const total = testimonials.length;
  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % total);
    }, 6200);
    return () => clearInterval(t);
  }, [paused, total]);

  const item = testimonials[index];

  return (
    <section id="voices" className="relative z-10 overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="06"
          label="Voices"
          title="What partners say when"
          accent="it's live"
          description="Reviews from founders, product leads and CTOs I've shipped with — pulled from project retrospectives."
        />

        {/* ---------------- slider ---------------- */}
        <div
          className="relative mt-14"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false);
            dragStart.current = null;
          }}
          onPointerDown={(e) => (dragStart.current = e.clientX)}
          onPointerUp={(e) => {
            if (dragStart.current === null) return;
            const delta = e.clientX - dragStart.current;
            if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
            dragStart.current = null;
          }}
        >
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02] p-7 sm:p-12"
            data-cursor="drag"
            data-cursor-label="Drag"
          >
            <div
              className="absolute inset-x-0 top-0 h-px opacity-70"
              style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
            />
            <Quote className="absolute top-8 right-8 h-16 w-16 text-white/5" />

            <div className="relative min-h-[15rem] sm:min-h-[13rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: dir * 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -dir * 60, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col gap-7"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: item.accent }} />
                    ))}
                  </div>
                  <p className="max-w-4xl text-xl leading-snug font-light text-fog sm:text-3xl sm:leading-[1.3]">
                    “{item.quote}”
                  </p>
                  <footer className="mt-auto flex items-center gap-4">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-full font-display text-sm font-bold text-ink"
                      style={{ background: `linear-gradient(140deg, ${item.accent}, #ffffffcc)` }}
                    >
                      {item.initials}
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold">{item.name}</span>
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                        {item.role}
                      </span>
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-8 flex items-center justify-between gap-6 border-t border-white/8 pt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  data-cursor="hover"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 transition-colors hover:border-white/35 hover:bg-white/5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  data-cursor="hover"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 transition-colors hover:border-white/35 hover:bg-white/5"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Testimonial from ${t.name}`}
                    className="relative h-1 overflow-hidden rounded-full bg-white/15 transition-all duration-500"
                    style={{ width: i === index ? 52 : 18 }}
                  >
                    {i === index && (
                      <motion.span
                        key={`bar-${index}`}
                        className="absolute inset-0 origin-left rounded-full"
                        style={{ background: t.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused ? 0.35 : 6.2, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <span className="font-mono text-[10px] tracking-[0.2em] text-mist tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- faq ---------------- */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase">Good to know</p>
            <h3 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              Questions I get
              <br />
              before <span className="font-editorial text-brand-2 italic">kickoff</span>
            </h3>
          </Reveal>

          <div className="border-t border-white/10">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className="border-b border-white/10">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      data-cursor="hover"
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={open}
                    >
                      <span
                        className={cn(
                          "font-display text-lg font-medium transition-colors sm:text-xl",
                          open ? "text-fog" : "text-fog/75",
                        )}
                      >
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: open ? 135 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-mist">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
