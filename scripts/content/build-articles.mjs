// scripts/content/build-articles.mjs
import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "public/content/articles");
const OUTPUT_FILE = path.join(ARTICLES_DIR, "index.json");

function toPublicUrl(absPath) {
  const norm = absPath.replace(/\\/g, "/");
  const idx = norm.indexOf("/public/");
  return idx >= 0 ? norm.slice(idx + "/public".length) : norm;
}

function resolveCover(slug, val) {
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val; // externí URL
  if (val.startsWith("/")) return val;       // absolutní cesta v /public
  return toPublicUrl(path.join(ARTICLES_DIR, slug, val)); // relativní soubor
}

async function pickFileForSlug(slug, files) {
  // Preferuj "slug/index.md", jinak vezmi naposledy změněný .md ve slugu
  const preferred = `${slug}/index.md`;
  if (files.includes(preferred)) return preferred;

  let best = null;
  let bestMtime = 0;
  for (const rel of files) {
    const full = path.join(ARTICLES_DIR, rel);
    const stat = await fs.stat(full);
    if (stat.mtimeMs > bestMtime) {
      bestMtime = stat.mtimeMs;
      best = rel;
    }
  }
  return best; // může být null, když by slug neměl žádný .md (nečekané)
}

async function main() {
  // seber VŠECHNY .md soubory ve struktuře "<slug>/*.md"
  const allMd = await fg("*/*.md", { cwd: ARTICLES_DIR, dot: false });

  // seskup do mapy dle slugu
  const bySlug = new Map(); // slug -> string[]
  for (const rel of allMd) {
    const slug = rel.split("/")[0];
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(rel);
  }

  const items = [];
  for (const [slug, relFiles] of bySlug.entries()) {
    const rel = await pickFileForSlug(slug, relFiles);
    if (!rel) continue;

    const fullPath = path.join(ARTICLES_DIR, rel);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data /*, content*/ } = matter(raw);

    const title = data.title ?? slug;
    const dateIso = data.date ? new Date(data.date).toISOString() : null;
    const excerpt = data.excerpt ?? "";
    const cover = resolveCover(slug, data.cover);

    let sortDate = dateIso;
    if (!sortDate) {
      const stat = await fs.stat(fullPath);
      sortDate = stat.mtime.toISOString();
    }

    items.push({
      slug,
      title,
      date: sortDate,
      excerpt,
      cover,
      readTime: data.readTime ?? undefined,
    });
  }

  // novější první
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  // zapisuj jen když je změna
  await fs.mkdir(ARTICLES_DIR, { recursive: true });
  const json = JSON.stringify(items, null, 2);

  let prev = null;
  try { prev = await fs.readFile(OUTPUT_FILE, "utf8"); } catch {}
  if (prev === json) {
    console.log(`[CONTENT] ✔ Manifest beze změny (${items.length} položek)`);
    return;
  }

  await fs.writeFile(OUTPUT_FILE, json, "utf8");
  console.log(`[CONTENT] ✔ Vygenerováno: ${OUTPUT_FILE} (${items.length} položek)`);
}

main().catch((e) => {
  console.error("[CONTENT] ✖ Chyba generování manifestu:", e);
  process.exit(1);
});
