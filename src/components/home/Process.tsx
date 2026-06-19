import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We dig into your brand, audience and goals — then map where the momentum is hiding.",
  },
  {
    num: "02",
    title: "Design",
    body: "Strategy becomes a clear creative direction: identity, site, content and channels.",
  },
  {
    num: "03",
    title: "Build",
    body: "We make it — websites, video, campaigns and content, crafted to a high bar.",
  },
  {
    num: "04",
    title: "Grow",
    body: "We launch, measure and optimize — compounding results month over month.",
  },
];

export default function Process() {
  return (
    <section className="bg-ink py-16 text-bone md:py-24">
      <div className="max-w-site container-px">
        <Reveal>
          <p className="chip text-bone/50">How we work</p>
          <h2 className="mt-6 max-w-3xl font-display font-semibold uppercase text-display">
            A studio built for momentum
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i} as="div">
              <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-ink-800">
                <span className="font-display text-5xl font-semibold text-bone/15 transition-colors group-hover:text-bone/30">
                  {s.num}
                </span>
                <h3 className="mt-8 font-display text-2xl font-medium uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-bone/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
