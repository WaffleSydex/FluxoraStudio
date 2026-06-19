"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Turnstile from "@/components/ui/Turnstile";
import { TURNSTILE_ENABLED } from "@/lib/turnstile-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (TURNSTILE_ENABLED && !token) {
      setError("Please complete the verification below.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, turnstileToken: token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid username or password.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const field =
    "w-full border-b border-bone/20 bg-transparent py-3 text-lg text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-accent-400";

  return (
    <main className="grain flex min-h-screen items-center justify-center bg-ink px-5 text-bone">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/logo-flux.png"
            alt="Fluxora"
            width={56}
            height={56}
            className="h-12 w-12 object-contain invert"
          />
          <h1 className="mt-6 font-display text-2xl font-medium uppercase tracking-[0.3em]">
            Fluxora Admin
          </h1>
          <p className="mt-2 text-sm text-bone/50">Sign in to manage your site</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-bone/40">Username</span>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={field}
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-bone/40">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              autoComplete="current-password"
            />
          </label>

          {TURNSTILE_ENABLED && <Turnstile onVerify={setToken} theme="dark" />}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || (TURNSTILE_ENABLED && !token)}
            className="w-full rounded-full bg-bone px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <a
          href="/"
          className="mt-8 block text-center text-xs uppercase tracking-[0.2em] text-bone/40 hover:text-bone/70"
        >
          &#8592; Back to site
        </a>
      </div>
    </main>
  );
}
