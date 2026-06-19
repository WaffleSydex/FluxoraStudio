"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkHero, setDarkHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setDarkHero((e as CustomEvent<string>).detail === "dark");
    };
    document.addEventListener("hero-theme", handler);
    return () => document.removeEventListener("hero-theme", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = darkHero && !scrolled && !open;
  const textColor = isDark ? "text-bone" : "text-ink";
  const logoInvert = isDark ? "invert" : "";
  const burgerColor = isDark ? "bg-bone" : "bg-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo ${
          scrolled
            ? "bg-bone/90 py-3 shadow-[0_1px_0_rgba(10,10,10,0.08)] backdrop-blur-md"
            : open
            ? "py-5"
            : "bg-bone/95 py-4 backdrop-blur-sm md:bg-transparent md:py-5"
        }`}
      >
        <div className="max-w-site container-px flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Fluxora Studio home">
            <Image
              src="/logo-flux.png"
              alt="Fluxora"
              width={42}
              height={42}
              className={`h-9 w-9 object-contain transition-all duration-300 ${logoInvert}`}
              priority
            />
            <span className={`font-display text-sm font-medium uppercase tracking-[0.35em] transition-colors duration-300 ${textColor}`}>
              Fluxora
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:opacity-100 ${
                  isDark ? "text-bone/70 hover:text-bone" : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={`hidden rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors md:inline-flex ${
              isDark
                ? "bg-bone text-ink hover:bg-bone/90"
                : "bg-accent text-white hover:bg-accent-600"
            }`}
          >
            Start a project
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 transition-all duration-300 ${burgerColor} ${
                open ? "translate-y-[3.5px] rotate-45 !bg-bone" : ""
              }`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${burgerColor} ${
                open ? "-translate-y-[3.5px] -rotate-45 !bg-bone" : ""
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
            className="fixed inset-0 z-40 flex flex-col bg-ink text-bone md:hidden"
          >
            {/* Logo in overlay */}
            <div className="flex items-center gap-3 px-6 pt-20">
              <Image
                src="/logo-flux.png"
                alt="Fluxora"
                width={40}
                height={40}
                className="h-9 w-9 object-contain invert opacity-50"
              />
            </div>

            <nav className="container-px mt-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-display text-[2.8rem] uppercase tracking-tight leading-tight hover:text-bone/70 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="container-px mt-auto pb-12"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone/90"
              >
                Start a project <span>&#8594;</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
