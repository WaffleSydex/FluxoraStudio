import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/ui/Reveal";

export default function ServicesPreview() {
  return (
    <section className="max-w-site container-px py-16 md:py-24">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <p className="chip text-ink/50">What we do</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
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
              className="group flex items-center justify-between gap-6 border-b border-ink/10 py-7 transition-colors hover:bg-ink hover:text-bone"
            >
              <div className="flex items-baseline gap-6 px-2 sm:gap-10 md:px-6">
                <span className="font-display text-sm text-ink/40 group-hover:text-bone/50">
                  {s.num}
                </span>
                <h3 className="font-display text-2xl font-medium uppercase tracking-tight sm:text-4xl">
                  {s.title}
                </h3>
              </div>
              <div className="flex items-center gap-6 px-2 md:px-6">
                <span className="hidden text-xs uppercase tracking-[0.2em] text-ink/40 group-hover:text-bone/60 lg:block">
                  {s.tagline}
                </span>
                <span className="text-2xl transition-transform duration-500 ease-expo group-hover:translate-x-2">
                  &#8594;
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
