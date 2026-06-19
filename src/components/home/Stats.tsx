"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "M+", label: "Organic views driven" },
  { value: 8, suffix: "", label: "Services, one studio" },
  { value: 98, suffix: "%", label: "Client retention" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="max-w-site container-px py-14 md:py-20">
      <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display text-6xl font-semibold tracking-tight md:text-7xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ink/50">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
