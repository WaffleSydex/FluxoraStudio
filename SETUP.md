# Fluxora Studio — Setup Guide

This is the full setup for **fluxorastudio.com**: a Next.js marketing-agency site with a
small admin backend where you can edit footer/contact/social content and add portfolio
images **and** videos (upload a file or paste a YouTube/Vimeo link). It also has a contact
form that emails enquiries to **info@fluxorastudio.com** via Resend.

Follow the steps in order. Total time: ~15 minutes.

---

## 0. Prerequisites

- **Node.js 18.18+** (you have v22 ✅) — https://nodejs.org
- A free **Supabase** account — https://supabase.com (database + media storage)
- A free **Resend** account — https://resend.com (contact-form email)
- (Later, for going live) a free **Vercel** account — https://vercel.com

---

## 1. Install dependencies

From the project folder:

```bash
npm install
```

---

## 2. Create your Supabase project

1. Go to https://supabase.com/dashboard and click **New project**.
2. Name it `fluxorastudio`, pick a region close to you, set a strong database password.
3. Wait ~2 minutes for it to provision.

---

## 3. Run the database migrations

The SQL lives in `supabase/migrations/`. Run the files **in numerical order**.

### Option A — Supabase SQL Editor (easiest)

1. Dashboard → **SQL Editor** → **New query**.
2. Copy each file's contents into the editor and click **Run**, in order:
   1. `0001_site_settings.sql`
   2. `0002_portfolio_items.sql`
   3. `0003_storage.sql`
   4. `0004_rls_policies.sql`
   5. `0005_seed.sql`
3. Each should report **Success**. (They're safe to re-run.)

### Option B — Supabase CLI (optional, also what the GitHub integration uses)

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR-PROJECT-REF
supabase db push
```

`YOUR-PROJECT-REF` is the part of your project URL: `https://<PROJECT-REF>.supabase.co`.

> **GitHub integration note:** if you connect the repo to Supabase, set the
> **Working directory** to **empty / repo root** (the `supabase/` folder is at the root),
> and the **Production branch** to `main`.

---

## 4. Get your Supabase keys

Dashboard → **Project Settings** → **API**. You'll need:

- **Project URL**
- **anon public** key (safe in the browser — used to read content)
- **service_role** key (SECRET — used by the admin to write data + uploads)

---

## 5. Set up Resend (contact form)

1. Create an account at https://resend.com.
2. **API Keys** → create a key → copy it (starts with `re_`).
3. (When your domain is ready) **Domains** → add `fluxorastudio.com` and add the DNS
   records Resend shows you. Until then, the form can send from the shared
   `onboarding@resend.dev` sender for testing.

> You said you'll buy the email/domain soon — the code is already wired up. Just drop in
> `RESEND_API_KEY` when ready. Enquiries go to **info@fluxorastudio.com**.

---

## 6. Add environment variables

Copy the example file and fill it in:

```bash
cp .env.local.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin login (you choose these)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=a-long-random-string

# Contact form (Resend)
RESEND_API_KEY=your-resend-api-key
CONTACT_TO_EMAIL=info@fluxorastudio.com
CONTACT_FROM_EMAIL=Fluxora Studio <onboarding@resend.dev>

# Cloudflare Turnstile (spam protection on contact form + admin login)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADn16_5KwKyWuIQc
TURNSTILE_SECRET_KEY=your-turnstile-secret-key

# Site
NEXT_PUBLIC_SITE_URL=https://fluxorastudio.com
```

> **Turnstile:** the contact form and admin login both show a Cloudflare Turnstile
> widget and verify it server-side. The site key is public; keep the **secret key**
> server-only. If `TURNSTILE_SECRET_KEY` is left unset, verification is skipped (handy
> for local dev) — set it in production. Get keys at Cloudflare Dashboard → Turnstile.

Generate a strong session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Security:** only the two `NEXT_PUBLIC_*` Supabase values are exposed to the browser.
> `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_*` and `RESEND_API_KEY` are server-only — never
> prefix them with `NEXT_PUBLIC_`.

---

## 7. Run it locally

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin  → log in with your `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

You'll see the seeded sample portfolio and footer content. Edit in the admin and refresh
the public pages to see changes.

---

## 8. Using the admin

Go to `/admin` and sign in. Two tabs:

- **Footer & Contact** — tagline, footer blurb, email, phone, address, and social links
  (add/remove rows; icons supported for instagram, tiktok, youtube, linkedin, x/twitter,
  facebook, behance, dribbble — anything else shows a generic link icon).
- **Portfolio** — add an item:
  - Pick a **category** (Web, Social, Video, Branding, Content, SEO, Email, Ads).
  - Choose media: **upload image**, **upload video** (mp4/mov/webm, up to 500 MB), or
    **paste a YouTube/Vimeo link**.
  - For videos, optionally upload a **thumbnail/poster**.
  - Toggle **Feature on homepage**.
  - Set the **sort order**; **Edit**/**Delete** anytime.

Large video uploads go **directly** from your browser to Supabase Storage (via a signed
URL), so they're not limited by serverless upload caps.

---

## 9. Deploy to Vercel (when ready)

1. Push this folder to a GitHub repo.
2. https://vercel.com → **Add New… → Project** → import the repo.
3. Add **all** the env vars from `.env.local` in **Project → Settings → Environment Variables**
   (set `NEXT_PUBLIC_SITE_URL` to `https://fluxorastudio.com`).
4. Deploy. Then **Project → Settings → Domains → Add `fluxorastudio.com`** and follow the
   DNS steps at your registrar.

---

## Storage / cost notes

- Supabase free tier: **1 GB** storage, 5 GB egress/month.
- Big raw videos eat that fast — prefer the **YouTube/Vimeo link** option for long videos;
  use **upload** for short clips/reels.
- The bucket caps uploads at **500 MB/file** (change in `0003_storage.sql`).

---

## Project structure

```
.
├── SETUP.md                      ← you are here
├── supabase/migrations/          ← run these SQL files in order
├── src/
│   ├── app/
│   │   ├── (site)/               ← public pages (home, services, work, about, contact)
│   │   ├── admin/                ← login + dashboard
│   │   └── api/                  ← admin routes + contact (Resend)
│   ├── components/               ← UI, sections, admin widgets
│   └── lib/                      ← supabase clients, auth, data, types
└── public/                       ← logo + static assets
```

---

## Troubleshooting

- **Can't log in to /admin** → check `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `.env.local` and
  restart `npm run dev`.
- **"Unauthorized" / saves fail in admin** → `SUPABASE_SERVICE_ROLE_KEY` is missing or wrong.
- **Upload fails** → confirm migrations `0003` + `0004` ran (bucket + storage policies).
- **Contact form says "not configured"** → add `RESEND_API_KEY` (expected until you set it up).
- **Blank data on the site** → check the two `NEXT_PUBLIC_SUPABASE_*` values; restart dev.
