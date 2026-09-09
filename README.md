# Dad's Music Site — Starter

A minimal Next.js + Tailwind starter modeled on artist sites like nickhakim.com:
featured release, tour dates, discography, videos, merch, gallery, contact.

## What's here

```
app/
  layout.tsx          — root layout, fonts, page metadata
  page.tsx             — assembles all sections
  globals.css           — Tailwind + base styles
  components/
    Nav.tsx              — sticky anchor nav
    FeaturedRelease.tsx    — hero / latest release + pre-save link
    Tour.tsx                 — tour dates, grouped by region
    Discography.tsx           — releases with streaming embeds
    Videos.tsx                  — music video embeds
    Merch.tsx                     — store grid (links out to Shopify/Bandcamp/etc)
    Gallery.tsx                    — photo grid
    Footer.tsx                       — contact, mailing list, socials
data/
  site-content.ts   — ALL editable content lives here (no code changes needed for updates)
```

## Get it running locally

You'll need [Node.js](https://nodejs.org) (18+) installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## First things to do

1. **Edit `data/site-content.ts`** — swap in your dad's real name, tagline,
   email, socials, tour dates, releases, etc. This file drives the whole site.
2. **Add real images** to `/public` — replace the placeholder image paths
   referenced in `site-content.ts` (release cover, album art, merch photos,
   gallery photos).
3. **Get streaming embed URLs** — for Discography, go to a track/album on
   Apple Music or Spotify, use their "Embed" / share option, and paste the
   embed URL into `embedUrl`.
4. **Get a pre-save link** — sign up free at feature.fm or found.ee, create
   a smart link for the release, paste it into `preSaveUrl`.
5. **Set up a merch store** — easiest path is linking out to a Shopify,
   Bandcamp, or Printful storefront rather than building checkout yourself.
   Put those links in the `merch` array.

## Deploying

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, import the repo.
3. Vercel auto-detects Next.js — just click Deploy. Free tier covers this easily.
4. Buy a domain (Namecheap, Cloudflare, ~$10-20/year) and point it at the
   Vercel project (Vercel's dashboard walks you through the DNS records).

## Notes for further vibe-coding with Claude Code

- Styling is Tailwind utility classes — colors/fonts are defined once in
  `tailwind.config.ts` (see `ink`, `paper`, `accent`) so a full re-theme is a
  quick edit there.
- Fonts aren't wired up yet — add a display font (e.g. via `next/font/google`)
  in `app/layout.tsx` and reference it through `font-display` / `font-body`.
- If your dad wants to update tour dates/content himself without your help,
  the next step is swapping `data/site-content.ts` for a Notion-backed CMS —
  ask Claude Code to wire up the Notion API to fetch this same data shape.
- No test data is faked in — sections like Videos/Gallery/Merch render
  "coming soon" or nothing until you add real entries, so it's safe to deploy
  early and fill content in over time.
