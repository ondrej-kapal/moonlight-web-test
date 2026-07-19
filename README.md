# Moonlight Tattoo — web

One-page marketing site for tattoo artist **Dana Kubíková** (Prague). Czech copy, dark theme, moonlight-blue accent. Single-page app with file-based content — no backend, no database.

> **Rebrand pending:** the site is being transformed into a new identity. Structure, theme, and architecture stay; brand names/copy/assets will be renamed. Keep brand references (name, e-mail, Instagram handle, `public/brand/` assets) centralized and easy to swap.

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (full component set in `src/components/ui/`)
- React Router (`/`, `/articles`, `/articles/:slug`)
- [Decap CMS](https://decapcms.org/) for content editing (`/admin`), backed by GitHub via the OAuth relay in `api/`

A detailed architecture scheme (page layout, content pipeline, run modes) lives in [.claude/docs/architecture.md](.claude/docs/architecture.md).

## Getting started

Requires Node.js & npm.

```sh
npm i
npm run dev        # http://localhost:8080
```

`npm run dev` runs Vite plus three content watchers (one per collection) via `concurrently`, and stamps `public/version.json`. Use `npm run dev:solo` for Vite alone.

### All scripts

```sh
npm run dev            # version stamp + Vite (port 8080) + 3 content watchers
npm run dev:solo       # Vite only
npm run build          # version stamp + content manifests + production build to dist/
npm run preview        # serve the production build
npm run lint           # eslint (flat config)

# One-shot manifest rebuilds (what the watchers run on change):
npm run content:articles
npm run content:portfolio
npm run content:designs
npm run content:all
```

There is no test suite.

## Content

Content is file-based and committed to git:

1. Markdown + images live under `public/content/{articles,portfolio,designs}/<slug>/` (media stored next to the entry).
2. Scripts in `scripts/content/` scan those folders and generate an `index.json` manifest per collection. **Manifests are generated files — never edit them by hand**; edit the markdown and rebuild.
3. Section components fetch `/content/<collection>/index.json` at runtime. An empty collection removes its section from the page entirely.

### Editing via CMS

- **Production:** `/admin` serves Decap CMS backed by GitHub (OAuth relay in `api/`, env vars `OAUTH_GITHUB_CLIENT_ID/SECRET` on Vercel). `publish_mode: editorial_workflow` — saving creates a draft PR; "Publish" commits to `main` and triggers a redeploy. Editors need write access to the repo.
- **Local:** the Decap config has `local_backend: true`; run `npx decap-server` alongside `npm run dev` to use the CMS locally.

`npm run build` regenerates the manifests — CMS-published entries only appear on the site after a build.

## Deployment

> ⚠️ **Temporary:** deploys to **Vercel**; hosting will later migrate to a server + Cloudflare setup. This section (and `vercel.json`) goes away with the migration — see the architecture doc for the checklist. One-time Vercel/GitHub setup: [.claude/docs/HANDOVER-github-setup.md](.claude/docs/HANDOVER-github-setup.md).

Every push to `main` deploys. The build regenerates the content manifests, so CMS-published entries go live automatically. `vercel.json` rewrites non-file paths to `index.html` for React Router; real files (`/admin/index.html`, `/content/*`) and `/api/*` are served directly.
