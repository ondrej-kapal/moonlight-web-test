#!/usr/bin/env node
import fs from 'node:fs/promises';
import cp from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'version.json');

function gitShortHash() {
  try {
    return cp.execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    return null;
  }
}

async function main() {
  let pkg = { version: '0.0.0' };
  try {
    const raw = await fs.readFile(path.join(ROOT, 'package.json'), 'utf8');
    pkg = JSON.parse(raw);
  } catch (e) {}

  const commit = gitShortHash();
  const payload = {
    version: pkg.version ?? '0.0.0',
    commit: commit ?? null,
    time: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log('[VERSION] Wrote', OUT, payload);
}

main().catch((e) => {
  console.error('[VERSION] Error', e);
  process.exit(1);
});
