// scripts/content/build-articles.mjs
import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ARTICLES_DIR = path.resolve("public/content/articles");
const OUTPUT_FILE = path.join(ARTICLES_DIR, "index.json");

function toPublicUrl(absPath) {
  // /abs/.../public/content/articles/foo/cover.jpg -> /content/articles/foo/cover.jpg
  const norm = absPath.replace(/\\/g, "/");
  const idx = norm.indexOf("/public/");
  return idx >= 0 ? norm.slice(idx + "/public".length) : norm;
}

async function main() {
  // najdi všechny složky s index.md
  const entries = await fg("*/index.md", { cwd: ARTICLES_DIR, dot: false });
  const items = [];

  for (const rel of entries) {
    const slug = rel.split("/")[0];
    const fullPath = path.join(ARTICLES_DIR, rel);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data /*, content*/ } = matter(raw);

    const title = data.title ?? slug;
    const dateIso = data.date ? new Date(data.date).toISOString() : null;
    const excerpt = data.excerpt ?? "";

    // cover může být relativní soubor vedle index.md
    const coverAbs = data.cover ? path.join(ARTICLES_DIR, slug, data.cover) : null;
    const cover = coverAbs ? toPublicUrl(coverAbs) : null;

    // když není datum, použij mtime souboru pro řazení
    let sortDate = dateIso;
    if (!sortDate) {
      const stat = await fs.stat(fullPath);
      sortDate = stat.mtime.toISOString();
    }

    items.push({
      slug,
      title,
      date: sortDate,   // FE si to formátuje do CZ
      excerpt,
      cover,            // FE očekává jako "image"
      // readTime si můžeš doplnit později – tady ho zatím negenerujeme
    });
  }

  // novější první
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(items, null, 2), "utf8");
  console.log(`✔ Vygenerováno: ${OUTPUT_FILE} (${items.length} položek)`);
}

main().catch((e) => {
  console.error("✖ Chyba generování manifestu:", e);
  process.exit(1);
});
