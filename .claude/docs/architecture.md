# Moonlight Tattoo — Architecture & Runbook

Site for tattoo artist **Dana Kubíková** (Moonlight Tattoo, Prague). Czech copy, dark theme,
moonlight-blue accent (`--ml-accent: #4cb4e7`). SPA with file-based content — no backend, no database.

> **Rebrand pending:** "Moonlight" is being replaced by a new identity (name TBD). Everything in
> this document about structure/theme/pipeline stays valid; brand touchpoints that will need the
> rename are: site title + meta/OG tags in `index.html`, `public/brand/` assets, the booking
> e-mail, the Instagram handle, Decap admin page title, and (optionally) the `--ml-*` CSS var prefix.

## 1. Page scheme

```
/  (HomePage — one scroll page)
│
│  <Navbar>            fixed header: O mně · Proces · Portfolio · Články ·
│                      Volné návrhy · Kontakt · REZERVACE(→ #contact) · IG · mail · logo
│
├─ #home       Hero            fullscreen background video (/brand/HeroVideo.mov)
├─ #about      About           "O mně" — bio + portrait + Styly list (static copy)
├─ #styles     Styles          "Proces" — 4 steps: Konzultace → Návrh → Schválení → Tetování
├─ #portfolio  Portfolio       grid (max 4) from /content/portfolio/index.json + lightbox
├─ #articles   Articles        horizontal card strip from /content/articles/index.json
├─ #designs    FreeDesigns     "Volné návrhy" grid from /content/designs/index.json
│                              + lightbox; "Rezervovat" buttons scroll to #contact
├─ #contact    Contact         "Kontakt & Rezervace" — form + contact info
└─             VersionBadge    fixed bottom-right, reads /version.json

/articles            ArticlesPage    full article list
/articles/:slug      ArticleDetail   markdown rendered with react-markdown + remark-gfm
/admin               → hard redirect to static /admin/index.html (Decap CMS from CDN)
*                    NotFound
```

- Content-driven sections (Portfolio, Articles, FreeDesigns) **render `null` when their
  manifest is empty/missing** — the section disappears entirely.
- Navbar scroll-spy maps menu ids to DOM ids (`reservations` → `contact`) and compensates
  for the 89px fixed header; `/#hash` links from other routes are resolved by a retry loop
  in `HomePage`.

## 2. How it's built

```
                    ┌──────────────────────────────────────────────┐
   Decap CMS        │  public/content/<collection>/<slug>/         │
   (/admin, edits   │    index.md   (frontmatter + markdown body)  │
   markdown+media) ─▶    *.jpg/png  (media stored next to entry)   │
                    └──────────────────┬───────────────────────────┘
                                       │ scripts/content/build-{articles,portfolio,designs}.mjs
                                       │ (fast-glob + gray-matter; watchers rerun on change)
                                       ▼
                    public/content/<collection>/index.json   ← generated, committed, never hand-edited
                                       │
                                       │ fetch('/content/<collection>/index.json', no-cache) at runtime
                                       ▼
                    Articles.tsx / Portfolio.tsx / FreeDesigns.tsx / ArticlesPage / ArticleDetail
```

Collections (defined in `public/admin/config.yml`):

| Collection      | Folder                      | Manifest shape                                      |
|-----------------|-----------------------------|-----------------------------------------------------|
| Články          | `public/content/articles/`  | array of `{slug, title, date, excerpt, preview, cover, readTime}` |
| Portfolio       | `public/content/portfolio/` | `{images: [{src, alt}]}` (deduped, component shows 4) |
| Volné návrhy    | `public/content/designs/`   | `{designs: [{id, image, title, category, size, placement, ...}]}` |

Build-script conventions:
- Preferred entry is `<slug>/index.md`; for articles, if missing, the most recently modified `.md` in the slug folder wins.
- Image paths in frontmatter may be relative (resolved against the slug folder), absolute (`/...`), or external URLs.
- Articles without `date` sort by file mtime; newest first.
- Scripts skip writing when output is byte-identical (keeps watch loops and git quiet).

Other build steps:
- `scripts/build-version.mjs` → `public/version.json` (`{version, commit, time}`) on every `dev`/`build`.
- Vite bundles the React app (`@` → `src`, react-swc plugin).

## 3. How it's intended to run

**Local development**
```sh
npm i
npm run dev        # http://localhost:8080
```
`dev` runs four processes via concurrently: Vite + a chokidar watcher per collection that
rebuilds its `index.json` whenever markdown/images change. `npm run dev:solo` runs Vite alone
(use the `content:*` scripts to rebuild manifests manually).

**Local CMS editing**
`/admin` serves Decap CMS from CDN (pinned version) with `local_backend: true` — that expects a
`npx decap-server` proxy running alongside the dev server (not wired into npm scripts).

**Production CMS**
The Decap backend is `github` (`ondrej-kapal/moonlight-web-test`), authenticated through the
OAuth relay in this repo (`api/auth.js`, `api/callback.js`). Host-independent requirements:
- A GitHub OAuth App whose callback URL is `https://<deployed-domain>/api/callback`; its
  credentials are provided to the relay as env vars `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET`.
- `base_url` in `public/admin/config.yml` must equal the deployed domain.
- Editors log in with a GitHub account that has **write access** to the repo.
- `publish_mode: editorial_workflow` — saving creates a draft (a PR under the hood); content
  goes live only on "Publish", which commits to `main` and triggers a redeploy.

Everything an editor writes (markdown + images) is **committed to the GitHub repo** — the host
stores nothing; retrieve content with `git pull`.

**Production build**
`npm run build` → version stamp + **content manifests** (`content:all`) + Vite → static `dist/`.
The manifest step is critical on CI: without it, CMS-published entries never appear on the site.
Whatever the host, it must rewrite unknown paths to `index.html` for React Router while serving
real files (`/admin/index.html`, `/content/*`) directly and routing `/api/*` to the OAuth relay.

## 3b. Current hosting: Vercel (TEMPORARY — delete this section after migration)

> ⚠️ Hosting will move to a server + Cloudflare setup. **This is the migration cleanup
> checklist — execute it in full when the migration happens:**
>
> 1. Rehost `api/` (e.g. as a Cloudflare Worker) and update the GitHub OAuth App callback URL
>    + `base_url` in `public/admin/config.yml` to the new domain.
> 2. Delete `vercel.json`.
> 3. Delete `.claude/docs/HANDOVER-github-setup.md` (if it still exists).
> 4. Remove the "Hosting — Vercel (TEMPORARY)" section from `CLAUDE.md` (and its pointer to the
>    handover doc) and rewrite the README "Deployment" section for the new host.
> 5. Update section 3 of this doc if the flow changes, remove the Vercel row from section 5,
>    then delete this entire section 3b.
> 6. Delete the Vercel project in the dashboard (and the old OAuth App if a new one was made).
> 7. Update the `hosting-plan` memory: migration done.

- Vercel project imports the GitHub repo; every push to `main` triggers a build + deploy.
- `api/*.js` run as Vercel serverless functions; the OAuth env vars are set in the Vercel project.
- `vercel.json` implements the SPA rewrites (filesystem is served first; `/api/*` excluded).
- The GitHub OAuth App callback URL and `base_url` in `config.yml` point at the Vercel domain.

## 4. Design language

- Headings: `text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)]`, left-aligned, `mb-6`.
- Typeface: Lato (self-hosted in `public/fonts/`), weights 300–900.
- Helpers in `src/index.css`: `section-padding`, `section-spacing`, `card-hover`, plus legacy
  `gradient-text`/`gradient-text-gold` (red/gold — scheduled for removal, do not use).
- Cards/lightboxes: `Card` + hover overlay + fullscreen lightbox pattern (see Portfolio/FreeDesigns).
- Voice: first-person feminine, friendly informal "ty" in personal CTAs
  ("rezervuj si termín nebo mi jednoduše napiš").

## 5. Scheduled for removal

| What                        | Plan                                                          |
|-----------------------------|---------------------------------------------------------------|
| Legacy red/gold theme: `--tattoo-red/gold` tokens, `gradient-text*` (in `src/index.css`), button variants `hero`/`minimal` (in `button.tsx`) | superseded by the `--ml-accent` blue language — still referenced by `Articles`, `Hero`, `FreeDesigns`, `ArticleDetail`, `ArticlesPage`; swap those usages during the post-rebrand UI cleanup, then delete the tokens/variants |
| Vercel hosting (`vercel.json`, `api/` as Vercel functions, section 3b above) | replaced by a server + Cloudflare setup after the rebrand phase |

## 6. Planned next steps

- Dana's rebranding pass (new identity, assets, copy) — then minor UI fixes + frontend bugs.
- Booking: hook the contact/reservation flow to Google Calendar.
- Mobile burger menu in `Navbar` (commented out).
- Hosting migration to server + Cloudflare (see section 5).
