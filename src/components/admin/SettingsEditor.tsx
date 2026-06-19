"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_SETTINGS, type SiteSettings, type SocialLink } from "@/lib/types";

const SOCIAL_PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
  "linkedin",
  "x",
  "facebook",
  "behance",
  "dribbble",
];

export default function SettingsEditor() {
  const supabase = createClient();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (data) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...data,
          socials: Array.isArray(data.socials) ? data.socials : [],
        });
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function updateSocial(index: number, patch: Partial<SocialLink>) {
    setSettings((s) => ({
      ...s,
      socials: s.socials.map((soc, i) => (i === index ? { ...soc, ...patch } : soc)),
    }));
  }

  function addSocial() {
    setSettings((s) => ({ ...s, socials: [...s.socials, { platform: "instagram", url: "" }] }));
  }

  function removeSocial(index: number) {
    setSettings((s) => ({ ...s, socials: s.socials.filter((_, i) => i !== index) }));
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    const payload = {
      company_name: settings.company_name,
      tagline: settings.tagline,
      footer_blurb: settings.footer_blurb,
      contact_email: settings.contact_email,
      contact_phone: settings.contact_phone,
      contact_address: settings.contact_address,
      socials: settings.socials.filter((s) => s.url.trim() !== ""),
    };
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok ? "Saved ✓" : `Error: ${data.error ?? "Save failed"}`);
    } catch {
      setStatus("Error: network problem");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 3500);
    }
  }

  if (loading) return <p className="text-ink/50">Loading…</p>;

  const field =
    "mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors focus:border-accent";
  const labelCls = "block text-xs uppercase tracking-[0.18em] text-ink/45";

  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-display text-2xl font-medium uppercase tracking-tight">Footer content</h2>
        <p className="mt-1 text-sm text-ink/50">Tagline and the blurb shown in the footer.</p>
        <div className="mt-6 grid gap-6">
          <label>
            <span className={labelCls}>Tagline</span>
            <input className={field} value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </label>
          <label>
            <span className={labelCls}>Footer blurb</span>
            <textarea
              rows={3}
              className={`${field} resize-none`}
              value={settings.footer_blurb}
              onChange={(e) => set("footer_blurb", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium uppercase tracking-tight">Contact</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <label>
            <span className={labelCls}>Email</span>
            <input className={field} value={settings.contact_email} onChange={(e) => set("contact_email", e.target.value)} />
          </label>
          <label>
            <span className={labelCls}>Phone</span>
            <input className={field} value={settings.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Address / location</span>
            <input className={field} value={settings.contact_address} onChange={(e) => set("contact_address", e.target.value)} />
          </label>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium uppercase tracking-tight">Social links</h2>
          <button onClick={addSocial} className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-bone">
            + Add
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {settings.socials.length === 0 && <p className="text-sm text-ink/45">No social links yet.</p>}
          {settings.socials.map((soc, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-white p-3 sm:flex-row sm:items-center">
              <select
                value={SOCIAL_PLATFORMS.includes(soc.platform) ? soc.platform : "other"}
                onChange={(e) => updateSocial(i, { platform: e.target.value })}
                className="rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-accent"
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
                <option value="other">other</option>
              </select>
              {!SOCIAL_PLATFORMS.includes(soc.platform) && (
                <input
                  placeholder="platform name"
                  value={soc.platform}
                  onChange={(e) => updateSocial(i, { platform: e.target.value })}
                  className="rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-accent sm:w-36"
                />
              )}
              <input
                placeholder="https://…"
                value={soc.url}
                onChange={(e) => updateSocial(i, { url: e.target.value })}
                className="flex-1 rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-accent"
              />
              <button
                onClick={() => removeSocial(i)}
                className="rounded-lg border border-ink/15 px-3 py-2 text-sm text-ink/60 hover:border-red-400 hover:text-red-500"
                aria-label="Remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-4 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.18em] text-bone transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status && <span className="text-sm text-ink/60">{status}</span>}
      </div>
    </div>
  );
}
