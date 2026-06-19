"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SettingsEditor from "./SettingsEditor";
import PortfolioManager from "./PortfolioManager";
import BlogManager from "./BlogManager";

type Tab = "content" | "portfolio" | "blog";

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("content");

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "content", label: "Settings" },
    { key: "portfolio", label: "Portfolio" },
    { key: "blog", label: "Blog" },
  ];

  return (
    <div className="min-h-screen bg-bone">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-bone/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-flux.png" alt="Fluxora" width={32} height={32} className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
            <span className="font-display text-xs uppercase tracking-[0.3em] sm:text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/"
              target="_blank"
              className="hidden text-xs uppercase tracking-[0.18em] text-ink/50 hover:text-ink sm:inline"
            >
              View site &#8599;
            </a>
            <button
              onClick={signOut}
              className="rounded-full border border-ink/20 px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-bone sm:px-4 sm:py-2"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2.5 sm:gap-2 sm:px-5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                tab === t.key ? "bg-ink text-bone" : "text-ink/55 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-10">
        {tab === "content" && <SettingsEditor />}
        {tab === "portfolio" && <PortfolioManager />}
        {tab === "blog" && <BlogManager />}
      </main>
    </div>
  );
}
