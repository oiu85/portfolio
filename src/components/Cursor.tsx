import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-layer custom cursor: a crisp dot that tracks 1:1 and a lagging ring
 * that expands with a label when hovering anything tagged [data-cursor].
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "drag" | "text">("default");
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target) {
        setMode((target.dataset.cursor as "hover" | "drag" | "text") || "hover");
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        setMode("default");
        setLabel("");
      }
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const root = document.documentElement;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mouseenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("cursor-none-desktop");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === "default" ? 34 : mode === "text" ? 74 : label ? 88 : 62;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      {/* dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-fog mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: mode === "default" ? 6 : 5,
          height: mode === "default" ? 6 : 5,
          opacity: hidden ? 0 : 1,
          scale: down ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : mode === "default" ? 0.5 : 1,
          scale: down ? 0.88 : 1,
          borderColor:
            mode === "default" ? "rgba(233,236,248,0.35)" : "rgba(108,92,255,0.75)",
          backgroundColor: mode === "default" ? "rgba(0,0,0,0)" : "rgba(108,92,255,0.12)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[9px] tracking-[0.18em] text-fog uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
