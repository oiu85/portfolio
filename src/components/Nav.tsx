import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui";
import { navigation, profile, socials } from "@/data/portfolio";
import { scrollToId, scrollToTop, stopScroll, useActiveSection } from "@/hooks";
import { cn } from "@/utils/cn";
import { externalLinkProps } from "@/utils/links";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navigation.map((n) => n.id));

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const hideY = useSpring(useMotionValue(0), { stiffness: 200, damping: 26, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    const shouldHide = !open && latest > prev && latest > 320;
    hideY.set(shouldHide ? -118 : 0);
  });

  useEffect(() => {
    hideY.set(open ? -118 : 0);
  }, [open, hideY]);

  useEffect(() => {
    stopScroll(open);
    return () => stopScroll(false);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 420 : 0);
  };

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 z-[65] h-[2px] w-full origin-left bg-gradient-to-r from-brand via-aqua to-brand-2"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 sm:pt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ y: hideY }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled ? "glass shadow-[0_18px_60px_-24px_rgba(0,0,0,0.9)]" : "border border-transparent",
          )}
        >
          {/* monogram */}
          <button
            onClick={scrollToTop}
            data-cursor="hover"
            data-cursor-label="Top"
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-aqua font-display text-[13px] font-bold text-ink">
              {profile.initials}
              <span className="absolute inset-0 translate-y-full bg-ink/85 transition-transform duration-500 group-hover:translate-y-0" />
              <span className="absolute inset-0 grid translate-y-full place-items-center text-fog transition-transform duration-500 group-hover:translate-y-0">
                ↑
              </span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight">{profile.name}</span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-mist uppercase">{profile.role}</span>
            </span>
          </button>

          {/* desktop dock */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                data-cursor="hover"
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300",
                  active === item.id ? "text-fog" : "text-mist hover:text-fog",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10 ring-inset"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.28} radius={120} className="hidden sm:block">
              <button
                onClick={() => go("contact")}
                data-cursor="hover"
                data-cursor-label="Hire me"
                className="shine group relative flex items-center gap-2 rounded-full bg-fog px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-white"
              >
                <span className="shine-bar" />
                <span className="relative z-10">Let&apos;s talk</span>
                <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/5 text-fog lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[58] flex flex-col justify-between bg-ink/92 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col">
              {navigation.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.id)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="hairline flex items-baseline justify-between py-4 text-left"
                >
                  <span className="font-display text-3xl font-semibold">{item.label}</span>
                  <span className="font-mono text-[10px] text-mist">{item.index}</span>
                </motion.button>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  {...externalLinkProps(s.url)}
                  className="rounded-full border border-white/12 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-mist uppercase"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* side rails */}
      <div className="pointer-events-none fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 xl:block">
        <div className="pointer-events-auto flex flex-col items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              {...externalLinkProps(s.url)}
              data-cursor="hover"
              className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase transition-colors hover:text-fog"
              style={{ writingMode: "vertical-rl" }}
            >
              {s.label}
            </a>
          ))}
          <span className="h-16 w-px bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </div>
    </>
  );
}
