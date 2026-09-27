import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import About from "@/components/About";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";
import { navigation } from "@/data/portfolio";
import { scrollToId, stopScroll, useActiveSection, useSmoothScroll } from "@/hooks";
import { cn } from "@/utils/cn";

/** Right-hand section rail: shows where you are in the story. */
function SectionRail() {
  const active = useActiveSection(navigation.map((n) => n.id));
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });

  return (
    <div className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block">
      <div className="pointer-events-auto relative flex flex-col items-center gap-3">
        <span className="absolute top-0 h-full w-px bg-white/12" />
        <motion.span
          className="absolute top-0 w-px origin-top bg-gradient-to-b from-brand to-aqua"
          style={{ scaleY: fill, height: "100%" }}
        />
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            data-cursor="hover"
            data-cursor-label={item.label}
            aria-label={`Go to ${item.label}`}
            className="group relative z-10 grid h-4 w-4 place-items-center"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-500",
                active === item.id ? "scale-150 bg-aqua" : "bg-white/25 group-hover:bg-white/60",
              )}
            />
            <span className="pointer-events-none absolute right-6 rounded-full border border-white/10 bg-ink-2/90 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] whitespace-nowrap text-fog uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll(true);

  /* hold the page still while the intro plays */
  useEffect(() => {
    stopScroll(true);
  }, []);

  useEffect(() => {
    if (ready) stopScroll(false);
  }, [ready]);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <div className="grain relative min-h-screen bg-ink">
      <Preloader onDone={onDone} />
      <Cursor />
      <Background />
      <SectionRail />
      <Nav />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero ready={ready} />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  );
}
