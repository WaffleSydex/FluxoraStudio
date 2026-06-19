import { getFeaturedPortfolio } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import PortfolioGrid from "@/components/work/PortfolioGrid";
import Button from "@/components/ui/Button";

export default async function FeaturedWork() {
  const items = await getFeaturedPortfolio(5);

  if (items.length === 0) return null;

  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="max-w-site container-px mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <p className="chip text-ink/50">Selected work</p>
          <h2 className="mt-6 max-w-2xl font-display font-semibold uppercase text-display">
            Work that moves
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <Button href="/work" variant="outline">
            View all work
          </Button>
        </Reveal>
      </div>

      <PortfolioGrid items={items} showFilters={false} />
    </section>
  );
}
