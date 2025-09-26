// scripts/generate-thumbnails.mjs
// Usage: node scripts/generate-thumbnails.mjs
// Requires: ImageMagick + Ghostscript installed (the `magick` or `convert` CLI)

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SOURCE_DIRS = [
  "public/downloads/patterns",
  "public/downloads/recipes",
  "public/downloads/field-notes",
  "public/downloads/tags",
];

const TARGET_BASE = "public/downloads/thumbnails";
const TARGET_WIDTH = 800; // px

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function walkPdfFiles(dir, out = []) {
  const entries = fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true })
    : [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkPdfFiles(full, out);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".pdf")) {
      out.push(full);
    }
  }
  return out;
}

function whichMagickCli() {
  // Prefer `magick` (ImageMagick 7+), fallback to `convert` (older)
  const tryCmd = (cmd) =>
    spawnSync(cmd, ["-version"], { stdio: "ignore" }).status === 0;
  if (tryCmd("magick")) return "magick";
  if (tryCmd("convert")) return "convert";
  return null;
}

function needsUpdate(src, dest) {
  if (!fs.existsSync(dest)) return true;
  const srcStat = fs.statSync(src);
  const destStat = fs.statSync(dest);
  return srcStat.mtimeMs > destStat.mtimeMs;
}

function generateThumbForPdf(cli, srcPdf, category) {
  const base = path.basename(srcPdf, path.extname(srcPdf)); // file name without .pdf
  const destDir = path.join(TARGET_BASE, category);
  ensureDir(destDir);
  const destImg = path.join(destDir, `${base}.webp`);

  if (!needsUpdate(srcPdf, destImg)) {
    return { status: "skip", src: srcPdf, dest: destImg };
  }

  // Build CLI args:
  // -density improves raster quality for PDF; [0] = first page only
  // -resize 800x keeps aspect ratio; -strip removes metadata
  const args =
    cli === "magick"
      ? [
          "-density",
          "180",
          `${srcPdf}[0]`,
          "-quality",
          "90",
          "-resize",
          `${TARGET_WIDTH}x`,
          "-strip",
          destImg,
        ]
      : [
          "-density",
          "180",
          `${srcPdf}[0]`,
          "-quality",
          "90",
          "-resize",
          `${TARGET_WIDTH}x`,
          "-strip",
          destImg,
        ];

  const res = spawnSync(cli, args, { encoding: "utf8" });
  if (res.status === 0) {
    return { status: "ok", src: srcPdf, dest: destImg };
  } else {
    return {
      status: "error",
      src: srcPdf,
      dest: destImg,
      error: res.stderr || res.stdout,
    };
  }
}

function main() {
  const cli = whichMagickCli();
  if (!cli) {
    console.error(
      "❌ ImageMagick not found. Install it first (and Ghostscript):\n" +
        "  macOS: brew install imagemagick ghostscript\n" +
        "  Ubuntu/Debian: sudo apt-get install -y imagemagick ghostscript"
    );
    process.exit(1);
  }

  const results = [];
  for (const srcDir of SOURCE_DIRS) {
    const category = path.basename(srcDir); // patterns | recipes | tags
    const pdfs = walkPdfFiles(srcDir);
    for (const pdf of pdfs) {
      results.push(generateThumbForPdf(cli, pdf, category));
    }
  }

  // Summary
  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status === "skip").length;
  const err = results.filter((r) => r.status === "error");

  console.log(
    `\n✅ Thumbnails done. Created: ${ok}, Skipped (up-to-date): ${skip}, Errors: ${err.length}`
  );
  if (err.length) {
    console.log("\nErrors:");
    for (const e of err) {
      console.log(`- ${e.src} -> ${e.dest}\n  ${e.error}`);
    }
  }
}

main();
