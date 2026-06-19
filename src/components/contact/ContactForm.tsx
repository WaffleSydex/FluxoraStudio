"use client";

import { useState } from "react";
import Turnstile from "@/components/ui/Turnstile";
import { TURNSTILE_ENABLED } from "@/lib/turnstile-client";

const services = [
  "Website",
  "Instagram / Social",
  "Video Editing",
  "Branding",
  "Content",
  "Paid Social",
  "SEO",
  "Email",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services[0]);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [token, setToken] = useState(""); // turnstile
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (TURNSTILE_ENABLED && !token) {
      setError("Please complete the verification below.");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, budget, message, company, turnstileToken: token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not send your message.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setBudget("");
      setMessage("");
      setService(services[0]);
      setToken("");
    } catch {
      setError("Network problem. Please try again.");
      setStatus("error");
    }
  }

  const field =
    "w-full border-b border-ink/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-accent";

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-ink/15 bg-white p-10">
        <h3 className="font-display text-3xl font-medium uppercase tracking-tight">Message sent</h3>
        <p className="mt-3 text-ink/60">
          Thanks — we&apos;ve got your enquiry and will reply within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 link-underline text-sm uppercase tracking-[0.18em]"
        >
          Send another &#8594;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">Your name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className={field} />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={field}
          />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">What do you need?</span>
          <select value={service} onChange={(e) => setService(e.target.value)} className={field}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">Budget (optional)</span>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="$5k – $10k" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-ink/40">Tell us about it</span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A few lines about your project, goals and timeline…"
          className={`${field} resize-none`}
        />
      </label>

      {TURNSTILE_ENABLED && <Turnstile onVerify={setToken} />}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending" || (TURNSTILE_ENABLED && !token)}
        className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-bone transition-colors hover:bg-ink-700 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">&#8594;</span>
      </button>
    </form>
  );
}
