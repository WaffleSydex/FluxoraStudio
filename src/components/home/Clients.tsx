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
        <p className="max-w-site container-px mb-10 text-center text-xs uppercase tracking-[0.3em] text-ink/40">
          Results that speak for themselves
        </p>
      </Reveal>
      <div className="max-w-site container-px grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {results.map((r, i) => (
          <Reveal key={r.label} delay={i} as="div">
            <div className="flex flex-col items-center text-center">
              <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                <Counter to={r.to} suffix={r.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-ink/45 leading-snug">
                {r.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
