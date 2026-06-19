"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SettingsEditor from "./SettingsEditor";
import PortfolioManager from "./PortfolioManager";

type Tab = "content" | "portfolio";

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("content");

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "content", label: "Footer & Contact" },
    { key: "portfolio", label: "Portfolio" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-bone/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-flux.png" alt="Fluxora" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-sm uppercase tracking-[0.3em]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-xs uppercase tracking-[0.18em] text-ink/50 hover:text-ink"
            >
              View site &#8599;
            </a>
            <button
              onClick={signOut}
              className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-bone"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-2 px-5 pb-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                tab === t.key ? "bg-ink text-bone" : "text-ink/55 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        {tab === "content" ? <SettingsEditor /> : <PortfolioManager />}
      </main>
    </div>
  );
}
