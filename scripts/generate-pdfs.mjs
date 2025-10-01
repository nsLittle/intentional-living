#!/usr/bin/env node
// Usage:
//   node scripts/generate-pdfs.mjs --base=http://localhost:3000 --slugs=bold-earth,sweet-harmony
// Optional:
//   --out=public/downloads/recipes   (default)
// Environment alternative:
//   SITE_BASE=https://dev--simple-intentions.netlify.app node scripts/generate-pdf.mjs --slugs=bold-earth

import { chromium } from "playwright";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const map = new Map();
  for (const a of argv.slice(2)) {
    if (a.startsWith("--")) {
      const [k, v = ""] = a.slice(2).split("=");
      map.set(k, v);
    }
  }
  return map;
}

const args = parseArgs(process.argv);
const base =
  args.get("base") || process.env.SITE_BASE || "http://localhost:3000";
const outDir = path.resolve(
  process.cwd(),
  args.get("out") || "public/downloads/recipes"
);

const slugsArg = args.get("slugs") || "";
if (!slugsArg) {
  console.error(
    "Missing --slugs. Example:\n  node scripts/generate-pdf.mjs --base=http://localhost:3000 --slugs=bold-earth,sweet-harmony"
  );
  process.exit(1);
}
const slugs = slugsArg
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

await fsp.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

for (const slug of slugs) {
  const urlToRender = `${base}/recipes/${slug}`;
  console.log(`→ Rendering ${urlToRender}`);

  await page.goto(urlToRender, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" }); // use your print CSS

  const pdfPath = path.join(outDir, `${slug}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
  });

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Failed to write PDF for ${slug}`);
  }
  console.log(`✓ Saved ${pdfPath}`);
}

await browser.close();
console.log("Done.");
