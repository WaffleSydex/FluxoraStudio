import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "ghost" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm uppercase tracking-[0.18em] transition-colors duration-500 ease-expo";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-white hover:bg-accent-600",
  outline: "border border-ink/30 text-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:opacity-60",
  // for use on dark (ink) backgrounds
  light: "border border-bone/40 text-bone hover:bg-bone hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
}) {
  const inner = (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
        &#8594;
      </span>
    </Link>
  );

  return magnetic ? <Magnetic strength={0.25}>{inner}</Magnetic> : inner;
}
