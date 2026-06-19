"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORD = "FLUXORA";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only show once per browser session.
    if (sessionStorage.getItem("fx_loaded")) {
      setShow(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sessionStorage.setItem("fx_loaded", "1");
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("fx_loaded", "1");
        setTimeout(() => setShow(false), 450);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = "")}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-bone"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end gap-1 overflow-hidden">
            {WORD.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="font-display text-[14vw] font-semibold uppercase leading-none tracking-tighter md:text-[9vw]"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px w-[60vw] max-w-md origin-left bg-bone/30"
          />

          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 text-xs uppercase tracking-[0.3em] text-bone/50 md:px-12">
            <span>Marketing in motion</span>
            <span className="tabular-nums">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
