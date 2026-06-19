import { Reveal } from "@/components/ui/Reveal";

const quotes = [
  {
    quote:
      "Fluxora rebuilt our site and ran our social in one go. Leads doubled in a quarter and we finally look the part.",
    name: "Maya R.",
    role: "Founder, Atlas Co.",
  },
  {
    quote:
      "Their video team is unreal. The reels they cut for us outperformed everything we'd ever posted.",
    name: "Daniel K.",
    role: "Head of Brand, Pulse",
  },
  {
    quote:
      "One studio for brand, web and content. No more juggling five freelancers — and the work is sharper.",
    name: "Lena T.",
    role: "CMO, Drift",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-site container-px py-16 md:py-24">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="chip text-ink/50">Word of mouth</p>
            <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
              Brands that trust us
            </h2>
          </div>
          <p className="max-w-xs text-ink/55">
            We work as an extension of your team — and it shows in the results.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i} as="div">
            <figure className="flex h-full flex-col justify-between rounded-xl border border-ink/12 bg-white p-7 transition-transform duration-500 ease-expo hover:-translate-y-1">
              <span className="font-display text-5xl leading-none text-accent">&ldquo;</span>
              <blockquote className="mt-4 text-lg leading-relaxed text-ink/80">{q.quote}</blockquote>
              <figcaption className="mt-8 border-t border-ink/10 pt-5">
                <p className="font-display font-medium uppercase tracking-tight">{q.name}</p>
                <p className="text-sm text-ink/50">{q.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
