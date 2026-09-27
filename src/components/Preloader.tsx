import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Mobile Engineering", "AI Systems", "Interface Motion", "Product Craft"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const total = 1500;
    let frame = 0;
    const timers: number[] = [];
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        timers.push(window.setTimeout(() => setOpen(false), 220));
        timers.push(window.setTimeout(onDone, 1150));
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((progress / 100) * WORDS.length))];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ opacity: 1 }}
        >
          {/* split curtains */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink-2"
            exit={{ y: "-102%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          >
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-2"
            exit={{ y: "102%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua to-transparent" />
          </motion.div>

          <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 px-8"
            exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand to-aqua font-display text-2xl font-bold text-ink"
            >
              AA
              <span className="absolute inset-0 rounded-3xl border border-white/25" />
            </motion.div>

            <div className="flex h-6 items-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={word}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-[10px] tracking-[0.34em] text-mist uppercase"
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="w-full">
              <div className="flex items-end justify-between font-mono text-[11px] tracking-[0.2em] text-mist uppercase">
                <span>Loading experience</span>
                <span className="text-3xl leading-none font-semibold text-fog tabular-nums">
                  {String(progress).padStart(3, "0")}
                </span>
              </div>
              <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand via-brand-2 to-aqua"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
