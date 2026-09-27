import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Fixed ambient layer: aurora blobs, a perspective grid that drifts with the
 * pointer, and a soft spotlight that follows the cursor everywhere on the page.
 */
export default function Background() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${spotX} ${spotY}, rgba(108,92,255,0.13), transparent 62%)`;

  const gridX = useTransform(sx, (v) => `${(v - 0.5) * -46}px`);
  const gridY = useTransform(sy, (v) => `${(v - 0.5) * -46}px`);

  const { scrollYProgress } = useScroll();
  const hueShift = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  const raf = useRef(0);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#131a3a_0%,#080a14_45%,#05060c_100%)]" />

      {/* aurora blobs */}
      <motion.div className="absolute inset-0" style={{ y: auroraY, filter: useMotionTemplate`hue-rotate(${hueShift}deg)` }}>
        <div className="animate-drift absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(108,92,255,0.34),transparent_62%)] blur-3xl" />
        <div
          className="animate-drift absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(53,224,224,0.22),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-drift absolute bottom-[-14rem] left-1/4 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(185,139,255,0.2),transparent_62%)] blur-3xl"
          style={{ animationDelay: "-8s" }}
        />
      </motion.div>

      {/* pointer-reactive perspective grid */}
      <motion.div
        className="grid-lines absolute inset-[-10%] opacity-70"
        style={{ x: gridX, y: gridY, maskImage: "radial-gradient(80% 60% at 50% 40%, black, transparent 78%)" }}
      />

      {/* spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_40%,rgba(3,4,9,0.86)_100%)]" />
    </div>
  );
}
