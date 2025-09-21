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

// Debounce – ať se build nespouští mockrát po sobě
let timer = null;
function debouncedBuild() {
  clearTimeout(timer);
  timer = setTimeout(runBuild, 200);
}

// Inicializační build
runBuild();

// Sleduj celý adresář článků, ale ignoruj výstupní index.json a dot-soubory
const watcher = chokidar.watch(ARTICLES_DIR, {
  ignored: [
    OUTPUT_FILE,
    /(^|[/\\])\../, // .git, .DS_Store apod.
  ],
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
});

watcher.on("all", (event, filePath) => {
  const rel = path.relative(ARTICLES_DIR, filePath);

  // 👉 Reaguj na jakýkoliv .md (ne jen index.md), obrázky a změny složek
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
