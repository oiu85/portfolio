import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, CornerDownLeft, Send, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from "@/components/icons";
import { Magnetic, Reveal, SectionHeading } from "@/components/ui";
import { profile, socials } from "@/data/portfolio";
import { cn } from "@/utils/cn";
import { externalLinkProps } from "@/utils/links";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: MailIcon,
} as const;

const projectTypes = ["Mobile app", "AI feature", "Website / landing", "Architecture rescue", "Consulting"];
const budgets = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"];

type Draft = { name: string; email: string; type: string; budget: string; message: string };

const empty: Draft = { name: "", email: "", type: projectTypes[0], budget: budgets[1], message: "" };

function Field({
  label,
  value,
  onChange,
  error,
  textarea,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 font-mono tracking-[0.18em] uppercase transition-all duration-300",
          active ? "top-2 text-[9px] text-brand-2" : "top-1/2 -translate-y-1/2 text-[11px] text-mist",
          textarea && !active && "top-6 translate-y-0",
          textarea && active && "top-2",
        )}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          placeholder={focused ? placeholder : ""}
          className={cn(
            "w-full resize-none rounded-2xl border bg-white/[0.02] px-4 pt-7 pb-3 text-sm text-fog transition-colors outline-none placeholder:text-mist/50",
            error ? "border-rose/60" : "border-white/10 focus:border-brand/60",
          )}
        />
      ) : (
        <input
          id={id}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          className={cn(
            "h-14 w-full rounded-2xl border bg-white/[0.02] px-4 pt-4 text-sm text-fog transition-colors outline-none placeholder:text-mist/50",
            error ? "border-rose/60" : "border-white/10 focus:border-brand/60",
          )}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block pl-1 font-mono text-[10px] tracking-wide text-rose"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [draft, setDraft] = useState<Draft>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Draft, string>> = {};
    if (draft.name.trim().length < 2) next.name = "Please tell me your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email)) next.email = "A valid email helps me reply";
    if (draft.message.trim().length < 12) next.message = "A sentence or two about the project";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // There is no backend: the brief is delivered through the visitor's own mail client.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = mailto;
    setState("sent");
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `${draft.type} project — ${draft.name}`,
  )}&body=${encodeURIComponent(
    `Name: ${draft.name}\nEmail: ${draft.email}\nProject: ${draft.type}\nBudget: ${draft.budget}\n\n${draft.message}`,
  )}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="07"
          label="Start something"
          title="Tell me what you're"
          accent="building"
          description="Send the shape of the idea — a paragraph is plenty. I reply personally within a day, with an honest read on scope, timeline and whether I'm the right person for it."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ---------- left rail ---------- */}
          <div className="flex flex-col gap-5">
            <Reveal className="panel relative overflow-hidden rounded-[2rem] p-6 sm:p-7">
              <div className="dot-grid absolute inset-0 opacity-20" />
              <div className="relative">
                <p className="font-mono text-[10px] tracking-[0.24em] text-mist uppercase">Direct line</p>
                <button
                  onClick={copyEmail}
                  data-cursor="hover"
                  data-cursor-label={copied ? "Copied" : "Copy"}
                  className="group mt-3 flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="truncate font-display text-lg font-semibold transition-colors group-hover:text-brand-2 sm:text-xl">
                    {profile.email}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span key="yes" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                          <Check className="h-4 w-4 text-lime" />
                        </motion.span>
                      ) : (
                        <motion.span key="no" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                          <CornerDownLeft className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
                <div className="mt-5 grid gap-3 border-t border-white/8 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase">Response time</p>
                    <p className="mt-1 text-sm text-fog/90">Under 24 hours</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-mist uppercase">Usually online</p>
                    <p className="mt-1 text-sm text-fog/90">09:00 – 20:00 GMT+3</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {socials.map((s, i) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap] ?? MailIcon;
                return (
                  <Reveal key={s.label} delay={i * 0.05} y={20}>
                    <Magnetic strength={0.16} radius={110} className="w-full">
                      <a
                        href={s.url}
                        {...externalLinkProps(s.url)}
                        data-cursor="hover"
                        className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium">{s.label}</span>
                          <span className="block truncate font-mono text-[10px] text-mist">{s.handle}</span>
                        </span>
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Magnetic>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="glass flex items-center gap-4 rounded-[2rem] p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime/15">
                <WhatIsHint />
              </span>
              <p className="text-[13px] leading-snug text-fog/90">
                <span className="font-semibold">Currently taking on two new projects.</span> If you have a deadline in
                mind, mention it early — I'd rather be honest than overbooked.
              </p>
            </Reveal>
          </div>

          {/* ---------- form ---------- */}
          <Reveal y={40} duration={1}>
            <div className="panel noise-soft relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {state === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[30rem] flex-col items-center justify-center gap-6 text-center"
                  >
                    <motion.svg viewBox="0 0 64 64" className="h-24 w-24" fill="none">
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="30"
                        stroke="url(#g1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M18 33.5 28 43l19-20"
                        stroke="#b6f36a"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#6c5cff" />
                          <stop offset="1" stopColor="#35e0e0" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                    <h3 className="text-3xl font-semibold">Your brief is ready</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-mist">
                      Thanks {draft.name.trim().split(" ")[0]} — your email app should have opened with the brief
                      prefilled. Hit send there and I'll reply within 24 hours. Nothing opened? Use the button below or
                      write to {profile.email}.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={mailto}
                        data-cursor="hover"
                        className="flex items-center gap-2 rounded-full bg-fog px-5 py-3 text-[13px] font-semibold text-ink"
                      >
                        <Send className="h-3.5 w-3.5" /> Open email draft
                      </a>
                      <button
                        onClick={() => {
                          setDraft(empty);
                          setState("idle");
                        }}
                        className="rounded-full border border-white/15 px-5 py-3 text-[13px] font-medium transition-colors hover:bg-white/5"
                      >
                        Send another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold">Project brief</h3>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                        3 fields, 60 seconds
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Your name"
                        value={draft.name}
                        onChange={(v) => set("name", v)}
                        error={errors.name}
                        placeholder="Abdullah's next client"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={draft.email}
                        onChange={(v) => set("email", v)}
                        error={errors.email}
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <p className="mb-3 font-mono text-[9px] tracking-[0.22em] text-mist uppercase">Project type</p>
                      <div className="flex flex-wrap gap-2">
                        {projectTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set("type", t)}
                            data-cursor="hover"
                            className={cn(
                              "rounded-full border px-3.5 py-2 text-[12.5px] transition-all duration-300",
                              draft.type === t
                                ? "border-transparent bg-gradient-to-r from-brand to-aqua font-semibold text-ink"
                                : "border-white/12 text-mist hover:border-white/30 hover:text-fog",
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 font-mono text-[9px] tracking-[0.22em] text-mist uppercase">Budget range</p>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => set("budget", b)}
                            data-cursor="hover"
                            className={cn(
                              "rounded-full border px-3.5 py-2 font-mono text-[11px] transition-all duration-300",
                              draft.budget === b
                                ? "border-brand/60 bg-brand/15 text-fog"
                                : "border-white/12 text-mist hover:border-white/30",
                            )}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field
                      label="What are we building?"
                      value={draft.message}
                      onChange={(v) => set("message", v)}
                      error={errors.message}
                      textarea
                      placeholder="Goals, timeline, who it's for — anything you already know."
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <p className="max-w-[16rem] font-mono text-[10px] leading-relaxed text-mist">
                        No newsletters, no CRM sequences. One human reply.
                      </p>
                      <Magnetic strength={0.28} radius={140}>
                        <button
                          type="submit"
                          data-cursor="hover"
                          data-cursor-label="Send"
                          className="shine group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand via-brand-2 to-aqua px-7 py-4 text-sm font-semibold text-ink"
                        >
                          <span className="shine-bar" />
                          <Sparkles className="relative z-10 h-4 w-4" />
                          <span className="relative z-10">Send the brief</span>
                          <Send className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhatIsHint() {
  return <Sparkles className="h-5 w-5 text-lime" />;
}
