# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

One-page marketing site for **Moonlight Tattoo** — tattoo artist Dana Kubíková, Prague. All UI copy is **Czech**, the artist speaks in **first person feminine** ("ráda", "jsem věděla"). Dark theme only (black background, white text, moonlight-blue accent).

> **Rebrand pending:** the site is being transformed into a new identity. Structure, theme, and architecture stay; brand names/copy/assets will be renamed. Until the new identity is defined, keep brand references (name, e-mail, Instagram handle, `public/brand/` assets) centralized and easy to swap — don't spread "Moonlight" further into code or copy.

Stack: Vite + React 18 + TypeScript + Tailwind + shadcn/ui (full component set in `src/components/ui/`).

A full architecture scheme (page layout, content pipeline, run modes) lives in [.claude/docs/architecture.md](.claude/docs/architecture.md).

## Commands

```sh
npm run dev          # version.json + Vite (port 8080) + 3 content watchers, via concurrently
npm run dev:solo     # Vite only, no watchers / version stamp
npm run build        # version.json + production build to dist/
npm run lint         # eslint (flat config)
npm run preview      # serve the production build

# One-shot manifest rebuilds (what the watchers run on change):
npm run content:articles
npm run content:portfolio
npm run content:designs
```

There is no test suite. Dev server runs on **port 8080**, `@` aliases `./src`.

## Architecture

### Routing (`src/App.tsx`)
- `/` — `HomePage`: single scroll page assembled from section components
- `/articles`, `/articles/:slug` — article list + detail (React Router)
- `/admin` — redirected via `useEffect` to the **static** Decap CMS at `public/admin/index.html` (loaded from CDN); it is not a React route
- Cross-page navigation to home sections uses hashes (`/#articles`); HomePage polls for the element after navigation and scrolls to it

### Content pipeline (the core thing to understand)
Content is file-based, no backend:

1. Decap CMS (`public/admin/config.yml`) edits markdown + images under `public/content/{articles,portfolio,designs}/<slug>/index.md` (media stored next to the entry). Three collections: Články, Portfolio, Volné návrhy.
2. Node scripts `scripts/content/build-*.mjs` (fast-glob + gray-matter) scan those folders and generate an `index.json` manifest per collection, in the same folder. They only rewrite the file when the content actually changed. `scripts/content/watch-*.mjs` (chokidar) rerun them on md/image changes during `npm run dev`.
3. Section components (`Articles`, `Portfolio`, `FreeDesigns`) fetch `/content/<collection>/index.json` at runtime with `cache: 'no-cache'`.

**Manifests (`index.json`) are generated files committed to git** — never edit them by hand; edit the markdown and rebuild.

**Empty-section convention:** components that fetch content return `null` when there is no data — an empty collection removes the whole section from the page rather than rendering an empty box. Follow this pattern for new content-driven sections.

The Decap config has `local_backend: true`, which needs a `npx decap-server` proxy running for local CMS use (not wired into any npm script). In production the backend is `github` with an OAuth relay served from `api/` (env vars `OAUTH_GITHUB_CLIENT_ID/SECRET`) and `publish_mode: editorial_workflow` (drafts = PRs, publish = commit to `main`). **`npm run build` must regenerate the manifests (`content:all`) — CMS-published entries only appear after a build.**

### Hosting — Vercel (TEMPORARY)
> ⚠️ Hosting will migrate to a server + Cloudflare setup. When that happens, execute the **migration cleanup checklist** in [.claude/docs/architecture.md](.claude/docs/architecture.md) section 3b — it removes this section, the handover doc, `vercel.json`, and all other temporary Vercel leftovers.

Deployed on Vercel from the GitHub repo; every push to `main` deploys. `api/*.js` run as Vercel serverless functions (OAuth env vars live in the Vercel project). `vercel.json` rewrites non-file paths to `index.html` for React Router (`/api/*` excluded; real files like `/admin/index.html` and `/content/*` are served directly). The GitHub OAuth App callback URL and `base_url` in `config.yml` point at the Vercel domain.

**One-time setup status:** the dashboard-side setup (Vercel project, GitHub OAuth App, env vars, `base_url` fill-in, editor access) is tracked in [.claude/docs/HANDOVER-github-setup.md](.claude/docs/HANDOVER-github-setup.md) — a **living checklist**. Any session that progresses or changes this setup must update that doc's checkboxes and status line in the same turn. When its end-to-end test passes, delete the doc and its pointers here and in the README.

### Versioning
`scripts/build-version.mjs` (run by `dev`/`build`) writes `public/version.json` (package version + git short hash + timestamp); `VersionBadge` fetches it and shows a badge bottom-right.

### Design language
- Section headings: `text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)]`, left-aligned. The accent is `--ml-accent: #4cb4e7` (moonlight blue), defined in `src/index.css`.
- Layout helpers from `src/index.css`: `section-padding`, `section-spacing`, `card-hover`.
- `src/index.css` and `button.tsx` carry **legacy theme tokens** (`tattoo-red`, `tattoo-gold`, `gradient-text*`, button variants `hero`/`minimal`) — **scheduled for removal in the post-rebrand UI cleanup**. They are still referenced by `Articles`, `Hero`, `FreeDesigns`, `ArticleDetail`, and `ArticlesPage`, so swap those usages to the blue `--ml-accent` language first, then delete the tokens. New/updated UI must not use them.

### Gotchas
- `Hero` renders a background video from `/brand/HeroVideo.mov`; its text content was intentionally removed.
