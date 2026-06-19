import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/ui/Reveal";

export default function ServicesPreview() {
  return (
    <section className="max-w-site container-px py-14 md:py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <p className="chip text-ink/50">What we do</p>
          <h2 className="mt-5 max-w-2xl font-display font-semibold uppercase text-display">
            Everything your marketing needs
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-sm text-ink/60">
            One studio, every channel — except Google Ads. We focus on the work that builds
            brands and momentum.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 border-t border-ink/10">
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} delay={i % 4} as="div">
            <Link
              href="/services"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/10 py-5 transition-all duration-300 hover:bg-ink hover:px-5 md:grid-cols-[60px_1fr_1fr_auto] md:gap-8 md:py-6"
            >
              {/* Number */}
              <span className="font-display text-sm font-medium text-ink/30 transition-colors group-hover:text-bone/40">
                {s.num}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-medium uppercase tracking-tight transition-colors group-hover:text-bone sm:text-2xl md:text-3xl">
                {s.title}
              </h3>

              {/* Deliverables – hidden on mobile, visible md+ */}
              <div className="hidden flex-wrap gap-1.5 md:flex">
                {s.deliverables.slice(0, 3).map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors group-hover:border-bone/20 group-hover:text-bone/50"
                  >
                    {d}
                  </span>
                ))}
                {s.deliverables.length > 3 && (
                  <span className="rounded-full border border-ink/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-ink/30 transition-colors group-hover:border-bone/10 group-hover:text-bone/30">
                    +{s.deliverables.length - 3}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-all duration-500 ease-expo group-hover:border-bone group-hover:bg-bone group-hover:text-ink group-hover:translate-x-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={1}>
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-3.5 text-sm uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone"
          >
            View all services <span>&#8594;</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
