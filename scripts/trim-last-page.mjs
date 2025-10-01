// scripts/trim-last-page.mjs
import { readFile, writeFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import path from "node:path";

async function run() {
  const inPath = process.argv[2];
  if (!inPath) {
    console.error("Usage: node scripts/trim-last-page.mjs <path/to/file.pdf>");
    process.exit(1);
  }

  const absIn = path.resolve(inPath);
  const raw = await readFile(absIn);
  const src = await PDFDocument.load(raw);

  const total = src.getPageCount();
  if (total <= 1) {
    console.error("File has 1 page or fewer — nothing to trim.");
    process.exit(2);
  }

  const trimmed = await PDFDocument.create();
  const pagesToCopy = Array.from({ length: total - 1 }, (_, i) => i); // copy all but last
  const copied = await trimmed.copyPages(src, pagesToCopy);
  copied.forEach((p) => trimmed.addPage(p));

  const bytes = await trimmed.save();
  const outPath = absIn.replace(/\.pdf$/i, ".trimmed.pdf");
  await writeFile(outPath, bytes);

  console.log(`✅ Wrote ${outPath} (${total - 1} of ${total} pages kept)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
