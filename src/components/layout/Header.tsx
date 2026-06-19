"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo ${
          scrolled ? "bg-bone/80 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(10,10,10,0.08)]" : "py-5"
        }`}
      >
        <div className="max-w-site container-px flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Fluxora Studio home">
            <Image
              src="/logo-flux.png"
              alt="Fluxora"
              width={42}
              height={42}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-sm font-display font-medium uppercase tracking-[0.35em]">
              Fluxora
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent-600 md:inline-flex"
          >
            Start a project
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink text-bone md:hidden"
          >
            <nav className="container-px flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-5xl uppercase tracking-tight"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
