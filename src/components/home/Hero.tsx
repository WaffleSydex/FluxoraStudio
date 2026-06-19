"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      {/* Floating mark */}
      <motion.div
        style={{ y: markY, rotate, opacity }}
        className="pointer-events-none absolute right-[-6%] top-[14%] hidden lg:block"
      >
        <Image
          src="/logo-flux.png"
          alt=""
          width={520}
          height={520}
          className="h-[42vw] max-h-[620px] w-auto object-contain opacity-[0.06]"
          priority
        />
      </motion.div>

      <motion.div style={{ y, opacity }} className="max-w-site container-px relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="chip mb-8 text-ink/60"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Creative Marketing Studio
        </motion.p>

        <h1 className="font-display font-semibold uppercase text-hero">
          {["Marketing", "in motion."].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + li * 0.12 }}
              >
                {line === "in motion." ? (
                  <>
                    in <span className="text-outline">motion.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-md text-lg text-ink/70"
          >
            We build websites, run social, edit video and craft brands that move people —
            everything your marketing needs, in one studio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/work">See our work</Button>
            <Button href="/contact" variant="outline">
              Start a project
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="max-w-site container-px absolute inset-x-0 bottom-8 z-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink/40"
      >
        <span>Scroll</span>
        <span className="h-px w-12 bg-ink/30" />
      </motion.div>
    </section>
  );
}
