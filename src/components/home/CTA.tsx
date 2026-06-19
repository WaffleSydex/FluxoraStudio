import Link from "next/link";
import Marquee from "@/components/ui/Marquee";

export default function CTA() {
  return (
    <section className="bg-ink py-16 text-bone md:py-24">
      <Link href="/contact" className="group block">
        <Marquee
          items={["Let's build something", "Start a project", "Marketing in motion"]}
          className="font-display text-[14vw] font-semibold uppercase leading-none tracking-tighter md:text-[10vw]"
          speed={26}
        />
        <div className="max-w-site container-px mt-12 flex items-center justify-center">
          <span className="inline-flex items-center gap-4 rounded-full border border-bone/30 px-8 py-5 text-sm uppercase tracking-[0.2em] transition-colors duration-500 group-hover:bg-bone group-hover:text-ink">
            hello@fluxorastudio.com
            <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
              &#8594;
            </span>
          </span>
        </div>
      </Link>
    </section>
  );
}
