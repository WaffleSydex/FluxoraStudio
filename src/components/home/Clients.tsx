import Counter from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const results = [
  { to: 50, suffix: "+", label: "Brands grown" },
  { to: 4, suffix: ".2M", label: "Organic views in 90 days" },
  { to: 3, suffix: "×", label: "Average traffic lift" },
  { to: 8, suffix: "", label: "Marketing disciplines" },
  { to: 40, suffix: "%", label: "Avg. engagement lift" },
  { to: 2, suffix: ".1s", label: "Avg. page load time" },
];

export default function Clients() {
  return (
    <section className="border-y border-ink/10 py-10 md:py-14">
      <Reveal>
        <p className="max-w-site container-px mb-8 text-center text-xs uppercase tracking-[0.3em] text-ink/40">
          Results that speak for themselves
        </p>
      </Reveal>
      <div className="max-w-site container-px grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
        {results.map((r, i) => (
          <Reveal key={r.label} delay={i} as="div">
            <div className="bg-bone p-6 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <Counter to={r.to} suffix={r.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-ink/50">{r.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
