// scripts/content/watch-articles.mjs
import chokidar from "chokidar";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const ARTICLES_DIR = path.resolve("public/content/articles");
const OUTPUT_FILE = path.join(ARTICLES_DIR, "index.json");

function runBuild() {
  const child = spawn("node", ["scripts/content/build-articles.mjs"], {
    stdio: "inherit",
  });
  child.on("exit", (code) => {
    if (code === 0) {
      console.log("[CONTENT] ✔ Manifest článků aktualizován.");
    } else {
      console.error("[CONTENT] ✖ Chyba při generování manifestu (exit", code, ")");
    }
  });
}

// Debounce – so the build doesn't run several times in a row
let timer = null;
function debouncedBuild() {
  clearTimeout(timer);
  timer = setTimeout(runBuild, 200);
}

// Initial build
runBuild();

// Watch the whole articles directory, but ignore the output index.json and dotfiles
const watcher = chokidar.watch(ARTICLES_DIR, {
  ignored: [
    OUTPUT_FILE,
    /(^|[/\\])\../, // .git, .DS_Store, etc.
  ],
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
});

watcher.on("all", (event, filePath) => {
  const rel = path.relative(ARTICLES_DIR, filePath);

  // 👉 React to any .md (not just index.md), images, and folder changes
  const isMd = /\.md$/i.test(rel);
  const isImg = /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(rel);
  const isDirChange = event === "addDir" || event === "unlinkDir";

  if (isMd || isImg || isDirChange) {
    console.log(`[CONTENT] ${event}: ${rel}`);
    debouncedBuild();
  }
});

watcher.on("error", (err) => console.error("[CONTENT] Watcher error:", err));
console.log("[CONTENT] 👀 Sleduju:", ARTICLES_DIR);
