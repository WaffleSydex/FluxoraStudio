"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "@/lib/seo";

export default function Faq({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-site container-px py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="chip text-ink/50">{eyebrow}</p>
          <h2 className="mt-6 font-display font-semibold uppercase text-display">{title}</h2>
        </div>

        <div className="border-t border-ink/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-ink/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium uppercase tracking-tight md:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-colors duration-300 ${
                      isOpen ? "border-accent bg-accent text-white" : "border-ink/25"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-ink/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
