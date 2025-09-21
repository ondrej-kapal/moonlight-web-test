// scripts/content/build-articles.mjs
import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "public/content/articles");
const OUTPUT_FILE = path.join(ARTICLES_DIR, "index.json");

function toPublicUrl(absPath) {
  // /abs/.../public/content/articles/foo/cover.jpg -> /content/articles/foo/cover.jpg
  const norm = absPath.replace(/\\/g, "/");
  const idx = norm.indexOf("/public/");
  return idx >= 0 ? norm.slice(idx + "/public".length) : norm;
}

function resolveCover(slug, val) {
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val;      // externí URL
  if (val.startsWith("/")) return val;            // absolutní cesta v /public
  // relativní soubor vedle index.md
  return toPublicUrl(path.join(ARTICLES_DIR, slug, val));
}

async function main() {
  // najdi všechny články (složky s index.md); když dir neexistuje -> prázdné pole
  let entries = [];
  try {
    entries = await fg("*/index.md", { cwd: ARTICLES_DIR, dot: false });
  } catch {
    entries = [];
  }

  const items = [];

  for (const rel of entries) {
    const slug = rel.split("/")[0];
    const fullPath = path.join(ARTICLES_DIR, rel);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data /*, content*/ } = matter(raw);

    const title = data.title ?? slug;
    const dateIso = data.date ? new Date(data.date).toISOString() : null;
    const excerpt = data.excerpt ?? "";
    const cover = resolveCover(slug, data.cover);

    // když není datum, použij mtime souboru pro řazení
    let sortDate = dateIso;
    if (!sortDate) {
      const stat = await fs.stat(fullPath);
      sortDate = stat.mtime.toISOString();
    }

    items.push({
      slug,
      title,
      date: sortDate,      // FE si formátuje do CZ
      excerpt,
      cover,               // FE očekává jako "image"
      readTime: data.readTime ?? undefined,
    });
  }

  // novější první
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  // zapiš jen, když je změna (eliminuje nekonečné smyčky s watcherem)
  const json = JSON.stringify(items, null, 2);

  // zajisti, že cílová složka existuje
  await fs.mkdir(ARTICLES_DIR, { recursive: true });

  let prev = null;
  try {
    prev = await fs.readFile(OUTPUT_FILE, "utf8");
  } catch {
    // soubor ještě neexistuje – v pořádku
  }

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
