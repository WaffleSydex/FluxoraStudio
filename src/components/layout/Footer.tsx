import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import SocialIcon from "@/components/ui/SocialIcon";
import Marquee from "@/components/ui/Marquee";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="border-y border-bone/10 py-6">
        <Marquee
          items={["Websites", "Instagram", "Video Editing", "Branding", "Content", "Social", "SEO", "Email"]}
          className="font-display text-2xl uppercase tracking-tight text-bone/70"
          speed={34}
        />
      </div>

      <div className="max-w-site container-px py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + CTA */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-flux.png"
                alt="Fluxora"
                width={48}
                height={48}
                className="h-11 w-11 object-contain invert"
              />
              <span className="font-display text-lg uppercase tracking-[0.35em]">Fluxora</span>
            </Link>
            <p className="mt-6 max-w-md text-bone/60">{settings.footer_blurb}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-bone link-underline"
            >
              Start a project &#8594;
            </Link>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Menu</p>
            <ul className="mt-6 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-bone/80 hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/40">Contact</p>
            <ul className="mt-6 space-y-3 text-bone/80">
              {settings.contact_email && (
                <li>
                  <a href={`mailto:${settings.contact_email}`} className="link-underline">
                    {settings.contact_email}
                  </a>
                </li>
              )}
              {settings.contact_phone && (
                <li>
                  <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="link-underline">
                    {settings.contact_phone}
                  </a>
                </li>
              )}
              {settings.contact_address && <li className="text-bone/60">{settings.contact_address}</li>}
            </ul>

            {settings.socials.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {settings.socials.map((s) => (
                  <a
                    key={s.platform + s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-8 text-xs uppercase tracking-[0.18em] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} Fluxora Studio</span>
          <span>fluxorastudio.com</span>
          <Link href="/admin" className="link-underline hover:text-bone/70">
            Admin
          </Link>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none px-2 pb-6">
        <p className="text-center font-display font-semibold leading-none text-bone/[0.05] text-[18vw] tracking-tighter">
          FLUXORA
        </p>
      </div>
    </footer>
  );
}
