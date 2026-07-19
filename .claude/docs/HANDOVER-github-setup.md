# Handover: GitHub + Vercel setup for the Decap admin

Goal: Dana (the artist, non-technical) edits the site at `https://<domain>/admin` in her browser;
everything she publishes lands as commits in this repo and auto-deploys. **All repo-side code and
config for this is already done** — what remains is dashboard clicking (GitHub + Vercel) and two
small follow-up commits.

This doc is safe to commit: it contains no secrets, only names of env vars. **Never commit the
OAuth Client ID/Secret — they belong only in Vercel project env vars.**

> **Living document — keep it current.** Any session that completes, changes, or discovers
> something about this setup updates the checklist and status line below in the same turn.
> Once step 7 passes end-to-end, this doc has served its purpose — delete it and remove its
> pointers from `CLAUDE.md` and `README.md`.

**Status:** not started — repo-side prep done, no dashboard steps executed yet.

## Already done in the repo (don't redo)

| Piece | Where |
|---|---|
| GitHub OAuth relay (serverless functions) | `api/auth.js`, `api/callback.js` — expect env vars `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET` |
| Decap backend = `github`, drafts via `publish_mode: editorial_workflow` | `public/admin/config.yml` |
| `base_url` placeholder — **must be replaced with the real Vercel domain** | `public/admin/config.yml` (marked `TODO`) |
| Build regenerates content manifests (critical — without it CMS entries never appear) | `package.json` → `build` runs `content:all` |
| SPA rewrites for React Router | `vercel.json` |
| Decap pinned to exact version | `public/admin/index.html` (`decap-cms@3.14.1`) |

## Remaining steps (in order — tick off as completed, note date/domain where useful)

- [ ] 1. **Commit & push** the current working tree to `github.com/ondrej-kapal/moonlight-web-test` (branch `main`).
- [ ] 2. **Vercel**: *Add New Project* → import the repo. Framework auto-detects as Vite; default
   build (`npm run build`) and output (`dist/`) are correct. Note the assigned domain here: `______`
- [ ] 3. **GitHub OAuth App**: github.com → *Settings → Developer settings → OAuth Apps → New OAuth App*.
   - Homepage URL: `https://<vercel-domain>`
   - **Authorization callback URL: `https://<vercel-domain>/api/callback`**
   - Copy the Client ID, generate a Client Secret. (Dashboard only — do not paste into the repo.)
- [ ] 4. **Vercel env vars** (project → Settings → Environment Variables):
   `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET`. Redeploy so functions pick them up.
- [ ] 5. **Fix `base_url`** in `public/admin/config.yml` to `https://<vercel-domain>`, commit, push.
- [ ] 6. **Dana's access**: create/have her create a GitHub account (she only uses it as a login
   button), then repo → *Settings → Collaborators* → invite with **Write** access; accept the
   invite from her e-mail. Her account name: `______`
- [ ] 7. **End-to-end test**: open `https://<vercel-domain>/admin` → *Login with GitHub* (as Dana's
   account) → create an article draft → *Publish* → confirm the article appears on the site
   after the automatic redeploy (~1 min). **When this passes, delete this doc + its pointers.**

## Troubleshooting

- **Login popup errors / hangs** → callback URL in the OAuth App must be exactly
  `https://<domain>/api/callback`, and `base_url` in `config.yml` must be exactly the deployed
  origin. Both change if the domain changes (repo rename, custom domain).
- **Published article doesn't show up** → check the Vercel build log ran `content:all`
  (regenerates `public/content/*/index.json`).
- **Dana can't publish drafts** → her account needs Write access (editorial workflow creates
  branches/PRs under the hood).

## Known follow-ups (separate from this setup)

- `public/content/articles/` still contains test entries (`test/`, `můj-první-článek/`, …) that
  will show on the live site — delete via the admin or prune the folders.
- 9 pre-existing `npm run lint` errors (`any` types in `FreeDesigns`/`Portfolio`,
  `require()` in `tailwind.config.ts`) — slated for the post-rebrand bug-fix round.
- Legacy red/gold theme removal + repo/brand rename checklist: see
  [architecture.md](architecture.md) (sections 5–6).
- Hosting later migrates to server + Cloudflare — the OAuth relay moves too (e.g. Cloudflare
  Worker); checklist in the architecture doc, section 3b.
