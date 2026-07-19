# Skill: Create PR

Commit the current changes, push the branch, and open a pull request on GitHub with a generated description. Use when asked to create a PR, open a pull request, or push changes for review.

## How to run

Run all steps in order. Do not skip steps.

### 1. Gather context

Run these in parallel:

- `git status` — all changed and untracked files
- `git diff main...HEAD` and `git diff` — committed and uncommitted changes
- `git log main...HEAD --oneline` — commits already on this branch

### 2. Branch

If currently on `main`, create a branch first (`git switch -c <short-kebab-topic>`). Never commit directly to `main` — Decap CMS publishes to `main`, and Vercel deploys from it.

### 3. Stage files

Show the changed files and ask the user which to include. Wait for their answer, stage with explicit paths (`git add <files>` — never `git add .`), then show the staged list and confirm (y/n).

Repo-specific staging rules:

- `public/content/*/index.json` manifests are **generated** — never hand-edit them. If markdown or images under `public/content/` changed, run `npm run content:all` first and stage the regenerated manifests together with the content.
- `public/version.json` is rewritten on every `dev`/`build` run — leave it unstaged unless the change is an intentional release/version bump.

### 4. Verify

Before committing, run:

- `npm run lint`
- `npm run build` — also regenerates the content manifests; re-stage them if they changed

If either fails, stop and show the user the output.

### 5. Commit and push

Generate a concise commit message from the staged diff, show it to the user, and ask: proceed automatically, or run the commands themselves?

- **Manual:** hand over the exact commands (`git commit -m "..."`, `git push -u origin <branch>`) and wait for them to report back.
- **Automatic:** run `git commit -m "..."`, then `git push -u origin <branch>`. There are no pre-commit hooks in this repo.

### 6. Open the PR

Read `.github/pull_request_template.md` and fill every section from the diff gathered in step 1:

- **What & why** — lead with the *why*; group related changes into short bullets, don't list every file.
- **Testing** — how the change was verified (commands run, what was checked in the browser). If nothing was run, say so explicitly.
- **Deploy notes** — Vercel env vars, config changes, or manual steps needed. If none, write `None.`

Create the PR with `gh pr create` against `main`, passing the filled-in body. Report back the PR URL.
