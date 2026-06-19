import { RevealText, Reveal } from "@/components/ui/Reveal";

export default function PageHero({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="max-w-site container-px pt-36 pb-12 md:pt-44 md:pb-16">
      <Reveal>
        <p className="chip text-ink/50">{label}</p>
      </Reveal>
      <h1 className="mt-8 font-display font-semibold uppercase text-hero">
        <RevealText text={title} />
      </h1>
      {intro && (
        <Reveal delay={1}>
          <p className="mt-8 max-w-2xl text-lg text-ink/60">{intro}</p>
        </Reveal>
      )}
    </section>
  );
}
