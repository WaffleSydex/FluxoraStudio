import Button from "@/components/ui/Button";

/** Closing call-to-action band. Copy is passed per page (kept unique). */
export default function EndCTA({
  eyebrow,
  title,
  sub,
  href = "/contact",
  cta = "Start a project",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="bg-ink py-16 text-bone md:py-24">
      <div className="max-w-site container-px text-center">
        <p className="chip mx-auto text-bone/50">{eyebrow}</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display font-semibold uppercase text-display">
          {title}
        </h2>
        {sub && <p className="mx-auto mt-5 max-w-xl text-bone/60">{sub}</p>}
        <div className="mt-9 flex justify-center">
          <Button href={href} variant="light">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
