import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import SocialIcon from "@/components/ui/SocialIcon";
import Marquee from "@/components/ui/Marquee";
import { SERVICES } from "@/lib/services";

const pages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* Scrolling service strip */}
      <div className="border-y border-bone/10 py-5">
        <Marquee
          items={SERVICES.map((s) => s.title)}
          className="font-display text-2xl uppercase tracking-tight text-bone/60"
          speed={34}
        />
      </div>

      <div className="max-w-site container-px py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-flux.png"
                alt="Fluxora Studio"
                width={48}
                height={48}
                className="h-10 w-10 object-contain invert"
              />
              <span className="font-display text-base uppercase tracking-[0.35em]">Fluxora</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/55">
              {settings.footer_blurb}
            </p>
            <Link
              href="/contact"
              className="link-underline mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-bone/80 hover:text-bone"
            >
              Start a project &#8594;
            </Link>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/35">Pages</p>
            <ul className="mt-5 space-y-3">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-bone/70 hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/35">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.num}>
                  <Link
                    href="/services"
                    className="link-underline text-sm text-bone/70 hover:text-bone"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/35">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm">
              {settings.contact_email && (
                <li>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="link-underline text-bone/70 hover:text-bone"
                  >
                    {settings.contact_email}
                  </a>
                </li>
              )}
              {settings.contact_phone && (
                <li>
                  <a
                    href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                    className="link-underline text-bone/70 hover:text-bone"
                  >
                    {settings.contact_phone}
                  </a>
                </li>
              )}
              {settings.contact_address && (
                <li className="text-bone/50">{settings.contact_address}</li>
              )}
            </ul>

            {settings.socials.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.3em] text-bone/35">Follow</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {settings.socials.map((s) => (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-bone/10 pt-8 text-xs uppercase tracking-[0.18em] text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} Fluxora Studio. All rights reserved.</span>
          <span>Built with care. Marketing in motion.</span>
        </div>
      </div>

      {/* Background wordmark */}
      <div aria-hidden className="pointer-events-none select-none px-2 pb-4">
        <p className="text-center font-display font-semibold leading-none tracking-tighter text-bone/[0.04] text-[18vw]">
          FLUXORA
        </p>
      </div>
    </footer>
  );
}
