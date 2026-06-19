import { getSettings } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export default async function Testimonials() {
  const { testimonials } = await getSettings();

  if (!testimonials.length) return null;

  return (
    <section className="max-w-site container-px py-14 md:py-20">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="chip text-ink/50">Word of mouth</p>
            <h2 className="mt-5 font-display font-semibold uppercase text-display">
              Brands that trust us
            </h2>
          </div>
          <p className="max-w-xs text-ink/55">
            We work as an extension of your team — and it shows in the results.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((q, i) => (
          <Reveal key={i} delay={i} as="div">
            <figure className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg">
              {/* Stars */}
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                    <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.77l-3.09 1.685.59-3.41L2 4.635l3.455-.545L7 1z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink/75">
                &ldquo;{q.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-7 flex items-center gap-4 border-t border-ink/8 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold uppercase text-bone">
                  {q.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold uppercase tracking-tight text-ink">{q.name}</p>
                  <p className="text-xs text-ink/50">
                    {q.role}{q.company ? `, ${q.company}` : ""}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
