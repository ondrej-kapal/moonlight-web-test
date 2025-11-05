// scripts/content/build-portfolio.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const PORTF_DIR = path.join(ROOT, 'public/content/portfolio');
const OUTPUT_FILE = path.join(PORTF_DIR, 'index.json');

function toPublicUrl(absPath) {
  const norm = absPath.replace(/\\/g, '/');
  const idx = norm.indexOf('/public/');
  return idx >= 0 ? norm.slice(idx + '/public'.length) : norm;
}

function resolveImage(slug, val) {
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith('/')) return val;
  return toPublicUrl(path.join(PORTF_DIR, slug, val));
}

async function main() {
  // collect all markdown files under <slug>/index.md or any .md
  const allMd = await fg(['*/*.md', '*.md'], { cwd: PORTF_DIR, dot: false });

  const images = [];

  for (const rel of allMd) {
    const slug = rel.split('/')[0];
    const full = path.join(PORTF_DIR, rel);
    let raw = null;
    try { raw = await fs.readFile(full, 'utf8'); } catch { continue; }
    const { data } = matter(raw);

    // support multiple shapes: data.images = [{ image: 'path', alt: '...' }, { src: '...' }]
    if (Array.isArray(data.images)) {
      for (const it of data.images) {
        // support both string entries and object entries
        let srcRaw = null;
        let alt = '';
        if (typeof it === 'string') {
          srcRaw = it;
        } else if (it && typeof it === 'object') {
          srcRaw = it.image ?? it.src ?? it.path ?? null;
          alt = it.alt ?? it.caption ?? it.title ?? '';
        }
        const src = resolveImage(slug, srcRaw);
        if (src) images.push({ src, alt });
      }
    }

    // also allow a top-level cover field
    if (data.cover) {
      const c = resolveImage(slug, data.cover);
      if (c) images.push({ src: c, alt: data.title ?? slug });
    }
  }

  // dedupe by src preserving order
  const seen = new Set();
  const unique = [];
  for (const it of images) {
    if (seen.has(it.src)) continue;
    seen.add(it.src);
    unique.push(it);
  }

  // keep first N (component shows up to 8)
  const out = { images: unique };

  await fs.mkdir(PORTF_DIR, { recursive: true });
  const json = JSON.stringify(out, null, 2);

  // Always write the current manifest based on content. This ensures that
  // publishing/unpublishing portfolio entries updates `index.json` the
  // same way articles do (no silent retention of an older manifest).
  // Still avoid rewriting the file if the content is byte-identical.
  let prev = null;
  try { prev = await fs.readFile(OUTPUT_FILE, 'utf8'); } catch {}

  if (prev === json) {
    console.log(`[CONTENT] ✔ Portfolio manifest unchanged (${unique.length} images)`);
    return;
  }

  await fs.writeFile(OUTPUT_FILE, json, 'utf8');
  console.log(`[CONTENT] ✔ Generated: ${OUTPUT_FILE} (${unique.length} images)`);
}

main().catch((e) => {
  console.error('[CONTENT] ✖ Error building portfolio manifest:', e);
  process.exit(1);
});
