"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const words = ["Let's", "build", "something", "great"];

export default function ContactHero({ email }: { email: string }) {
  useEffect(() => {
    document.dispatchEvent(new CustomEvent("hero-theme", { detail: "dark" }));
    return () => {
      document.dispatchEvent(new CustomEvent("hero-theme", { detail: "light" }));
    };
  }, []);

  return (
    <section className="bg-ink pb-0 pt-36 text-bone md:pt-44">
      <div className="max-w-site container-px pb-16 md:pb-20">
        <motion.p
          className="chip text-bone/50"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Contact
        </motion.p>

        <h1 className="mt-8 font-display font-semibold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,8vw,6.5rem)]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.08 }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg text-bone/55"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          Tell us what you&apos;re building. We reply within one business day, get straight to
          the point, and only take on work we know we can deliver.
        </motion.p>

        <motion.a
          href={`mailto:${email}`}
          className="group mt-10 inline-flex items-center gap-3 text-bone/70 transition-colors hover:text-bone"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
        >
          <span className="font-display text-xl tracking-tight">{email}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/50 transition-all duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-ink group-hover:translate-x-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>
      </div>

      <div className="border-t border-bone/10" />
    </section>
  );
}
