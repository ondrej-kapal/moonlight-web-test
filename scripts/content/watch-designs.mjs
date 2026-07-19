// scripts/content/watch-designs.mjs
import chokidar from 'chokidar';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const DESIGNS_DIR = path.resolve('public/content/designs');
const OUTPUT_FILE = path.join(DESIGNS_DIR, 'index.json');

function runBuild() {
  const child = spawn('node', ['scripts/content/build-designs.mjs'], { stdio: 'inherit' });
  child.on('exit', (code) => {
    if (code === 0) console.log('[CONTENT] ✔ Designs manifest updated.');
    else console.error('[CONTENT] ✖ Error generating designs manifest (exit', code, ')');
  });
}

let timer = null;
function debouncedBuild() {
  clearTimeout(timer);
  timer = setTimeout(runBuild, 200);
}

runBuild();

const watcher = chokidar.watch(DESIGNS_DIR, {
  ignored: [OUTPUT_FILE, /(^|[/\\])\../],
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
});

watcher.on('all', (event, filePath) => {
  const rel = path.relative(DESIGNS_DIR, filePath);
  const isMd = /\.md$/i.test(rel);
  const isImg = /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(rel);
  const isDirChange = event === 'addDir' || event === 'unlinkDir';
  if (isMd || isImg || isDirChange) {
    console.log(`[CONTENT] ${event}: ${rel}`);
    debouncedBuild();
  }
});

watcher.on('error', (err) => console.error('[CONTENT] Watcher error:', err));
console.log('[CONTENT] 👀 Watching:', DESIGNS_DIR);
