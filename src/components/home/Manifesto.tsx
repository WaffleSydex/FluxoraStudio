import { Reveal, RevealText } from "@/components/ui/Reveal";

const points = [
  { k: "Strategy", v: "Positioning, messaging and a plan that ties every channel together." },
  { k: "Creative", v: "Brand, web, video and content crafted to a high, distinctive bar." },
  { k: "Growth", v: "Social, paid and SEO that compound attention into real results." },
];

export default function Manifesto() {
  return (
    <section className="max-w-site container-px py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="chip text-ink/50">The studio</p>
          </Reveal>
          <h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
            <RevealText text="We turn attention into" />{" "}
            <span className="text-outline">
              <RevealText text="growth." />
            </span>
          </h2>
        </div>

        <Reveal delay={1}>
          <div className="flex h-full flex-col justify-end">
            <p className="text-lg text-ink/60">
              Fluxora is a full-stack marketing studio. One team handles your brand, website,
              social, video and campaigns — so the work moves together instead of in silos.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.k} delay={i} as="div">
            <div className="h-full bg-bone p-7">
              <h3 className="font-display text-xl font-medium uppercase tracking-tight">{p.k}</h3>
              <p className="mt-3 text-sm text-ink/60">{p.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
