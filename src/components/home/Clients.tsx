import Marquee from "@/components/ui/Marquee";

const brands = ["ATLAS", "PULSE", "DRIFT", "VOLTAGE", "HARVEST", "SUMMIT", "NOVA", "ORBIT"];

export default function Clients() {
  return (
    <section className="border-y border-ink/10 py-10">
      <p className="max-w-site container-px mb-6 text-center text-xs uppercase tracking-[0.3em] text-ink/40">
        Trusted by ambitious brands
      </p>
      <Marquee
        items={brands}
        className="font-display text-3xl font-medium uppercase tracking-tight text-ink/30 md:text-5xl"
        speed={36}
      />
    </section>
  );
}
