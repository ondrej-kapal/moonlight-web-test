// scripts/content/build-designs.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const DESIGNS_DIR = path.join(ROOT, 'public/content/designs');
const OUTPUT_FILE = path.join(DESIGNS_DIR, 'index.json');

function toPublicUrl(absPath) {
  const norm = absPath.replace(/\\/g, '/');
  const idx = norm.indexOf('/public/');
  return idx >= 0 ? norm.slice(idx + '/public'.length) : norm;
}

function resolveImage(slug, val) {
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith('/')) return val;
  return toPublicUrl(path.join(DESIGNS_DIR, slug, val));
}

async function main() {
  // collect all markdown files under <slug>/*.md
  const allMd = await fg(['*/*.md', '*.md'], { cwd: DESIGNS_DIR, dot: false });

  const designs = [];

  for (const rel of allMd) {
    const slug = rel.split('/')[0];
    const full = path.join(DESIGNS_DIR, rel);
    let raw = null;
    try { raw = await fs.readFile(full, 'utf8'); } catch { continue; }
    const { data } = matter(raw);

    const title = data.title ?? slug;
    const category = data.category ?? (Array.isArray(data.tags) ? data.tags[0] : undefined) ?? 'other';
    const size = data.size ?? data.meta?.size ?? '';
    const placement = data.placement ?? data.meta?.placement ?? '';

    // images can be an array of strings or objects
    const imgs = Array.isArray(data.images) ? data.images : [];
    // if no images but cover exists, include it
    if (imgs.length === 0 && data.cover) imgs.push(data.cover);

    for (let i = 0; i < imgs.length; i++) {
      const it = imgs[i];
      let srcRaw = null;
      if (typeof it === 'string') srcRaw = it;
      else if (it && typeof it === 'object') srcRaw = it.image ?? it.src ?? it.path ?? null;
      const src = resolveImage(slug, srcRaw);
      if (!src) continue;

      designs.push({
        id: `${slug}-${i}`,
        image: src,
        title,
        category,
        size,
        placement,
        available: data.available ?? true,
        price: data.price ?? null,
      });
    }
  }

  // dedupe by image preserving order
  const seen = new Set();
  const unique = [];
  for (const it of designs) {
    if (seen.has(it.image)) continue;
    seen.add(it.image);
    unique.push(it);
  }

  const out = { designs: unique };

  await fs.mkdir(DESIGNS_DIR, { recursive: true });
  const json = JSON.stringify(out, null, 2);

  let prev = null;
  try { prev = await fs.readFile(OUTPUT_FILE, 'utf8'); } catch {}

  if (prev === json) {
    console.log(`[CONTENT] ✔ Designs manifest unchanged (${unique.length} items)`);
    return;
  }

  await fs.writeFile(OUTPUT_FILE, json, 'utf8');
  console.log(`[CONTENT] ✔ Generated: ${OUTPUT_FILE} (${unique.length} items)`);
}

main().catch((e) => {
  console.error('[CONTENT] ✖ Error building designs manifest:', e);
  process.exit(1);
});
