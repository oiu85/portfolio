import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from "@/components/icons";
import { KineticText, Magnetic, Marquee, Reveal } from "@/components/ui";
import { navigation, profile, socials } from "@/data/portfolio";
import { scrollToId, scrollToTop, useClock } from "@/hooks";
import { externalLinkProps } from "@/utils/links";

const iconMap = { github: GithubIcon, linkedin: LinkedinIcon, x: XIcon, mail: MailIcon } as const;

export default function Footer() {
  const clock = useClock();
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const { scrollYProgress } = useScroll();
  const ribbonX = useTransform(scrollYProgress, [0.6, 1], ["-6%", "4%"]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast(true);
      clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(false), 1900);
    } catch {
      setToast(false);
    }
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/8 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* big kinetic CTA */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase">
              Let&apos;s make something people brag about
            </p>
          </Reveal>
          <button
            onClick={() => scrollToId("contact")}
            data-cursor="hover"
            data-cursor-label="Contact"
            className="group text-left"
          >
            <span className="block font-display text-[15vw] leading-[0.82] font-bold tracking-[-0.05em] sm:text-[11vw]">
              <span className="text-grad">
                <KineticText text="LET'S" />
              </span>{" "}
              <span className="font-editorial italic text-fog/95">
                <KineticText text="talk" />
              </span>
            </span>
          </button>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={0.1} className="max-w-md">
              <p className="text-sm leading-relaxed text-mist">
                Freelance, contract or part-time — I work async-friendly across timezones and I document everything so
                your team keeps moving after hand-over.
              </p>
            </Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.3} radius={130}>
                <button
                  onClick={copy}
                  data-cursor="hover"
                  data-cursor-label="Copy"
                  className="flex items-center gap-3 rounded-full border border-white/12 px-5 py-3.5 text-sm font-medium transition-colors hover:border-white/35 hover:bg-white/5"
                >
                  <MailIcon className="h-4 w-4" />
                  {profile.email}
                </button>
              </Magnetic>
              <Magnetic strength={0.3} radius={130}>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="hover"
                  className="shine relative flex items-center gap-2 overflow-hidden rounded-full bg-fog px-6 py-3.5 text-sm font-semibold text-ink"
                >
                  <span className="shine-bar" />
                  <span className="relative z-10">Book a kickoff call</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* link grid */}
        <div className="mt-20 grid gap-10 border-t border-white/8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-aqua font-display text-sm font-bold text-ink">
              {profile.initials}
            </span>
            <p className="max-w-xs text-sm text-mist">
              {profile.name} — {profile.role}. Building mobile and AI products from anywhere.
            </p>
            <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">{profile.timezoneLabel}</span>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Navigate</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {navigation.slice(1).map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollToId(n.id)}
                  data-cursor="hover"
                  className="group flex w-fit items-center gap-2 text-sm text-fog/80 transition-colors hover:text-fog"
                >
                  <span className="h-px w-0 bg-brand-2 transition-all duration-500 group-hover:w-5" />
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Elsewhere</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {socials.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap] ?? MailIcon;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    {...externalLinkProps(s.url)}
                    data-cursor="hover"
                    className="group flex w-fit items-center gap-2.5 text-sm text-fog/80 transition-colors hover:text-fog"
                  >
                    <Icon className="h-4 w-4 text-mist transition-colors group-hover:text-brand-2" />
                    <span className="truncate">{s.icon === "mail" ? s.handle : s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Status</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-fog/85">
              <span className="flex items-center gap-2">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 rounded-full bg-lime" />
                  <span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-lime" />
                </span>
                {profile.availability}
              </span>
              <span className="font-mono text-[11px] text-mist">Your local time · {clock}</span>
              <button
                onClick={scrollToTop}
                data-cursor="hover"
                data-cursor-label="Top"
                className="group mt-2 flex w-fit items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[12.5px] transition-colors hover:border-white/35 hover:bg-white/5"
              >
                Back to top
                <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ribbon */}
      <motion.div className="mt-16 -rotate-1 border-y border-white/8 bg-white/[0.015] py-4" style={{ x: ribbonX }}>
        <Marquee speed={40} reverse>
          {["Available for freelance", "Open to remote roles", "Flutter architecture", "AI features", "Let's talk"].map(
            (word) => (
              <span key={word} className="flex items-center gap-6 px-8">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-fog/70 uppercase">
                  {word}
                </span>
                <span className="text-aqua">✦</span>
              </span>
            ),
          )}
        </Marquee>
      </motion.div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <p className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
          © 2026 {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
          Designed &amp; built by me — React, Vite, Tailwind, Framer Motion
        </p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed bottom-6 left-1/2 z-[75] -translate-x-1/2 rounded-full border border-white/12 bg-ink-2/95 px-5 py-3 font-mono text-[11px] tracking-wider text-fog shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur"
          >
            Email copied — {profile.email}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
