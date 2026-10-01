# Matty J Ruys — Artist Website

Official website for Matty J Ruys, NZ Soul-R&B artist. Current album focus: **Beautiful Mess** (release Nov 6, 2026). This file is context for Claude Code working in this repo — read it before making changes.

## Tech Stack

- **Next.js 16 (App Router)** — file-based routing, Server + Client Components
- **TypeScript** — strict mode; every array/object needs an explicit type (see Known Pitfalls)
- **Tailwind CSS** — utility classes, custom theme in `tailwind.config.ts`
- **Framer Motion** — all scroll/entrance animations, glitch triggers
- **Vercel** — hosting + CI/CD (auto-deploy on push to `main`) + Web Analytics (`@vercel/analytics`)
- **GitHub** — repo `isaacruys/mattyjruys`, branch `main` (only branch — `master` was deleted after a history rewrite)
- Domain: `mattyjruys.com`, registered via Squarespace, DNS pointed at Vercel

No CMS, no database. All content is static, editable through one file.

## Architecture

### Single source of truth: `data/site-content.ts`

**Every piece of real-world content lives here — never hardcode artist facts inside a component.** This is the most important convention in the project. If a component needs a name, date, link, or image path, it imports it from this file.

Current exports and their shape:

```ts
artist: { name: string; location: string }

socials: { label: string; url: string }[]

featuredRelease: {
  title: string;
  releaseDate: string;
  coverImage: string;   // local path under /public
  streamUrl: string;    // used by the Music hero section
}

tourDates: { region: string; shows: Show[] }[]
// shows: { date, city, venue, ticketUrl } — currently empty everywhere;
// Tour.tsx renders a static "Coming soon" instead of reading this array.
// Wire tourDates back in when real shows exist.

type ReleaseItem = {
  title: string;
  credit: string;       // name it was released under ("Matty J. Ruys", "Matthew J. Ruys", "Go Stop Go"); shown as a tag when ≠ artist.name
  type: "Album" | "EP" | "Single";
  releaseDate: string;  // "YYYY-MM-DD" or "YYYY"; pages sort on this string
  coverImage: string;
  listenUrl: string;    // HyperFollow if it exists, else Spotify, else Apple Music; "" hides the link
  onHomepage?: boolean;
}
discography: ReleaseItem[]     // THE master list of major releases (no remixes/radio edits).
                               // /discography shows ONE chronological list (oldest first) — no grouping by credit.
recentReleases: ReleaseItem[]  // derived: discography.filter(r => r.onHomepage); homepage, newest first

specialProjects: { year: string; artist: string; title: string; role: string }[]
// Matty's credits on other artists' records (writing, production, vocals, bands).
// Rendered on /discography below the releases, sorted by year; hidden when empty.
// CURRENTLY EMPTY: the Discogs-sourced list was removed because the artist said some
// of it was inaccurate. Only add credits the user/artist has confirmed — don't
// re-scrape Discogs to repopulate it.

type MerchItem = { name: string; price?: string; details?: string; status?: string; image: string; url: string; cta?: string }
merch: MerchItem[]  // empty = Merch.tsx shows a "Vinyl Soon" teaser instead

type VideoItem = { title: string; artist?: string; youtubeId: string }
videos: VideoItem[]  // array order = display order: Matty's videos in the artist's chosen order, then Go Stop Go / features last.
                     // Official videos only (no lyric-video duplicates, fan re-uploads, or Topic audio);
                     // Go Stop Go + features get `artist`. Empty = Videos.tsx renders nothing

galleryImages: string[]  // imported from data/gallery.json (see Adding Gallery Photos); empty = Gallery.tsx renders nothing

bio: string        // used on /about, paragraphs separated by blank lines; **Name** renders bold (people/acts only, not labels or song titles)
tracklist: string[] // Beautiful Mess tracklist, used on /about
```

**Convention: every list-type export should default to `[]` with an explicit type, never an untyped empty array literal.** See Known Pitfalls for why.

### Pages

- `app/page.tsx` — homepage: Nav → Countdown → ListeningParty → Music → Merch → RecentReleases → Tour → Videos → Gallery → Footer
- `app/about/page.tsx` — bio + tracklist
- `app/discography/page.tsx` — single chronological `discography` list (releases under other names — Matthew J. Ruys, Go Stop Go — get a small credit tag, not a separate section), then `specialProjects` as a compact year/artist/title/role list.

### Components (`app/components/`)

- `Nav.tsx` — fixed header, full-screen overlay menu (Framer `AnimatePresence`), links to `/`, `/about`, `/#music`, `/#tour`, `/discography`, `/#videos`, `/#merch`, `/#gallery`. Anchor links use `/#section` (not bare `#section`) so they work correctly from non-homepage pages.
- `Countdown.tsx` — large centered live countdown to Nov 6, 2026, glitch effect re-triggers every digit change via `key={...}` remount trick
- `ListeningParty.tsx` — single flyer image rendered at its intrinsic size (`width`/`height` + `w-full h-auto`), never `fill` + `object-cover`, which cropped it
- `Music.tsx` — homepage hero: split-screen (image one side, big stacked type other side), parallax scroll on the cover image, glitch title
- `RecentReleases.tsx` — alternating left/right editorial release list, reads `recentReleases`
- `Tour.tsx` — currently static "Coming soon", not reading `tourDates` (see above)
- `Videos.tsx` — horizontal snap-scroll carousel with counter + progress dots (synced on swipe too), reads `videos`. Cards are YouTube thumbnails with a play button; the real iframe (youtube-nocookie, autoplay) only loads on click — don't switch back to 15 eager iframes, it's ~1MB of player JS each.
- `Merch.tsx` — "Store": each `merch` item is a large feature row (product image left, status/name/details/price/CTA right, links out to the shop). Sits right after the Music hero so the vinyl pre-order is seen early. Product images should be transparent PNGs (see `/vinyl.png`) — a white-background product shot looks pasted-on against the dark site. Stays on the homepage until there are several products; then consider a `/store` page. Empty `merch` = "Vinyl Soon" teaser.
- `Gallery.tsx` — horizontal filmstrip, natural aspect ratio per image (no cropping — fixed height, auto width)
- `Footer.tsx` — socials list only (mailing list signup was deliberately removed — no backend to receive it; re-add only if wired to a real ESP like Mailchimp)
- `FixedBackground.tsx` — sitewide fixed/blurred/darkened background image behind all content, rendered once in `app/layout.tsx`

### Removed / not currently in use (don't reintroduce without reason)

- `LiveClock.tsx` — retired in favor of the big `Countdown.tsx`
- `SlashField.tsx` — diagonal slash decorative background (matches the album cover's slash lettering). Built, worked, but was **reverted** as a full-page ambient effect because it looked bad at scale. Could be reintroduced scoped to a single section (not fixed/global) if asked for "flair" again — check with the user on scope before rebuilding it full-page.
- `AsciiDivider.tsx`, `formatBoldText.tsx`, `getOgImage.ts` — built during exploration, not currently wired into any page. Safe to delete or resurrect depending on what's asked.

## Design System

Defined in `tailwind.config.ts`:

```ts
colors: {
  ink: "#F5F5F0",    // near-white text
  paper: "#0C0C0E",  // near-black background
  accent: "#C4272B", // red, matches "Beautiful Mess" cover typography
}
```

- Background: fixed, blurred (`blur(8px)`), darkened (`brightness(0.5)`) version of the album photography, with a `bg-paper/50` overlay on top — see `FixedBackground.tsx`. When blurring any background image, always pair with `transform: scale(1.05)` to hide the blurred edge artifact.
- Headings use `.glitch-text` (RGB-split flicker, defined in `globals.css`) with a `data-text` attribute matching the visible text — required for the CSS `content: attr(data-text)` trick to work.
- Countdown-style digits use `.countdown-glitch`, a related but separate class/animation for numbers that need to re-glitch on every value change (paired with `key={value}` to force remount).
- Typography: `font-display` for headings (not yet wired to a real font file — currently inherits system default; if picking one, look for something in the bold/condensed/italic family — Anton, Bebas Neue, or similar — to loosely echo the cover art's lettering).
- Buttons/links generally: uppercase, wide tracking (`tracking-widest`), thin animated underline on hover rather than filled buttons — keep this restrained, editorial feel rather than adding heavy UI chrome.

## Image Conventions

- **All local images live in `/public`**, referenced by root-relative path (`/beautiful-mess.jpg`, not `./public/beautiful-mess.jpg`).
- **Always use `next/image`** for local files — never a plain `<img>` — for automatic optimization/resizing. Exception: images fetched from an external URL at request time (e.g. scraping a HyperFollow page's OG image) need a plain `<img>` unless `next.config.js` is set up with `images.remotePatterns` for that domain.
- **Default to `object-contain`, not `object-cover`, unless cropping is explicitly wanted.** This project has repeatedly hit complaints about cropped images (vinyl teaser, gallery photos, about-page portrait) — the working pattern is a container with a background fill color (`bg-ink/5`) plus `flex items-center justify-center overflow-hidden`, and the image itself `object-contain`.
- **No album/single cover art in the gallery** — the gallery is for additional photos only. Covers belong on releases (`coverImage`).
- Gallery specifically preserves each photo's **natural aspect ratio** — fixed height (`h-72 md:h-96`), width auto — rather than forcing a uniform crop shape.
- Favicon: `app/icon.png` (or `.ico`/`.svg`) — Next.js App Router auto-detects this filename, no manual `<link>` tag needed.
- Cover art currently reused across multiple placeholders (`/beautiful-mess.jpg` used for the hero, discography entries, and About page portrait) — swap in dedicated images as they become available rather than treating this as permanent.

### Adding Gallery Photos

- Drop photos (any names, JPEG/PNG/WebP/HEIC) into `inbox/` (gitignored), then run `npm run images` or `npm run images -- --tag studio`.
- `scripts/add-images.mjs` auto-rotates, resizes to fit 2400px, compresses to JPEG, saves as `public/gallery/YYYY-MM-DD[-tag]-NN.jpg`, appends the path to `data/gallery.json`, and moves originals to `inbox/done/`.
- Gallery order = order in `data/gallery.json`; reorder/remove entries there by hand. Don't hardcode gallery paths in `site-content.ts`.
- HEIC is converted via macOS `sips` (sharp's prebuilt binaries can't decode it), so the script's HEIC support is Mac-only.

## Streaming / Release Links

- Distribution is via **DistroKid**. DistroKid has **no embeddable player** — the only public-facing link is a **HyperFollow** page (`distrokid.com/hyperfollow/...`), which is a link-out landing page, not an embed.
- Convention: every release entry stores a `listenUrl` (HyperFollow when one exists; older releases predate HyperFollow and use Spotify, or Apple Music if not on Spotify), rendered as a "Listen →" link that opens in a new tab. Do not attempt to iframe-embed a HyperFollow URL — it won't render as a player.
- If in-page audio preview is wanted later, that requires a platform-specific embed (Spotify/Apple Music `<iframe>` embed code, obtained per-track from that platform's own Share → Embed option) as a secondary element alongside the HyperFollow link — not a replacement for it.
- Cover art can be auto-fetched from a HyperFollow URL's Open Graph `og:image` meta tag server-side (see retired `getOgImage.ts` for a working implementation) if manual image uploads become a bottleneck — currently not in use; manual `coverImage` paths are preferred for now since they're simpler to reason about.

## Known Pitfalls (read before editing)

1. **TypeScript infers empty arrays as `never[]`.** Any array in `site-content.ts` that's empty right now (`tourDates`, `discography`, `merch`, `videos`, `galleryImages`) must have an explicit type annotation (`const merch: MerchItem[] = []`) or every component that maps over it will throw `Property 'x' does not exist on type 'never'` at build time.

2. **Never do partial/fragment edits via copy-paste into an existing file — write the whole file.** This codebase has repeatedly broken from a dropped opening tag (`<a`) or mismatched closing tag when only part of a JSX block got pasted, producing errors like "Expected a semicolon," "Unexpected token," or "JSX expressions must have one parent element." When editing a component, replace the entire file content, don't patch a fragment in place.

3. **`.next/` and `node_modules/` must never be committed.** This repo had a real incident where both got committed (100+ MB pushes, GitHub file-size warnings, `RPC failed` errors) because `.gitignore` didn't exist yet at first commit. Confirm `.gitignore` includes `/.next/`, `/node_modules`, and `.vercel` before any large commit. If either ever gets tracked again, `git rm -r --cached <folder>` and recommit.

4. **Framer Motion's `scaleY`/`scale` animations silently override a hardcoded `transform: rotate(...)` string.** If you need rotation alongside a Framer-animated scale, pass `rotate` as its own dedicated style property (`style={{ rotate: "20deg" }}`), not baked into a `transform` string — Framer merges dedicated rotate/scale/x/y style props correctly, but a manual `transform` string gets clobbered.

5. **`whileInView` can fail to trigger inside a parent with `overflow-hidden`,** especially combined with `position: absolute` children. If a scroll-triggered animation seems permanently stuck at its `initial` state (check DevTools — if `opacity: 0` / `scaleY(0)` never changes), switch to `animate` (fires on mount) rather than debugging `whileInView`'s viewport intersection further, unless the on-scroll trigger is specifically important.

6. **Random values (`Math.random()`) inside a Server Component or a Client Component's render body cause hydration mismatches** (server and client generate different random output for the same markup). Any randomized layout (e.g. the retired `SlashField`) must generate its random values inside a `useEffect`, not during render, so the server renders an empty/deterministic shell and the client fills in randomness after mount.

7. **`git commit` with no `-m` flag opens an interactive editor** (defaults to `vi`), which fails inside most integrated terminals with "there was a problem with the editor." Always commit with `git commit -m "message"`.

## Suggested Refactors (worth doing, not yet done)

- `RecentReleases.tsx` (homepage) and the release-list section of `app/discography/page.tsx` currently duplicate near-identical layout/markup for a `ReleaseItem`. Consider extracting a shared `<ReleaseCard release={...} variant="alternating" | "list" />` component once the discography page's final design is settled, rather than maintaining two copies.
- `Tour.tsx` ignores the `tourDates` data model entirely in favor of a static message — fine for now, but if real tour dates get added, decide whether to revive the original date/venue table (it existed earlier in the project) or design something new; don't silently leave `tourDates` populated but unused.
- No dedicated font is loaded yet (`font-display` falls back to system default) — worth using `next/font/google` (or a local font file) for a real display typeface once a direction is picked, rather than leaving it as a bare Tailwind alias with no font-family behind it.

## Design References / Best Practices for This Kind of Site

- **nickhakim.com** was the primary visual reference for this project's structure: full-bleed editorial single-page scroll, minimal fixed nav with a full-screen overlay menu, a live clock/location detail, tour dates as a plain grouped list, discography with embedded streaming players, and a photo gallery — same overall shape this site follows.
- General conventions worth defaulting to for an independent artist site:
  - Prioritize fast load and mobile performance over heavy embeds — lazy-load iframes (`loading="lazy"`), keep decorative animation libraries lightweight, avoid stacking many simultaneous animated elements (this project already hit a real jank issue from over-using one decorative effect at high element counts — keep flourishes sparing).
  - Link out to smart-links (HyperFollow, feature.fm, found.ee) rather than betting on one streaming platform being the visitor's platform of choice.
  - Keep merch/store sections honest about status ("Coming soon" / "Preorder") rather than showing placeholder products that look real.
  - Accessibility basics: meaningful `alt` text on every image (even decorative ones should have an empty `alt=""` rather than a missing attribute), sufficient contrast for white-on-dark body text (this project uses `text-ink/80` rather than full white specifically to soften harsh contrast — don't casually bump it to pure white without checking legibility against the background image).
  - SEO/metadata: `app/layout.tsx`'s `metadata` export should stay accurate as pages are added — each new top-level page (`/about`, `/discography`) can export its own `metadata` for a more specific title/description if asked.
