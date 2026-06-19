"use client";

import { motion } from "framer-motion";

export default function PageHero({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  const words = title.split(" ");

  return (
    <section className="max-w-site container-px pt-36 pb-12 md:pt-44 md:pb-16">
      {/* Label chip */}
      <motion.p
        className="chip text-ink/50"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {label}
      </motion.p>

      {/* Page title — word-by-word clip reveal using animate (not whileInView) */}
      <h1 className="mt-8 font-display font-semibold uppercase text-hero">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + i * 0.07,
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Intro */}
      {intro && (
        <motion.p
          className="mt-8 max-w-2xl text-lg text-ink/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {intro}
        </motion.p>
      )}
    </section>
  );
}
