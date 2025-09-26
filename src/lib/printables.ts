// src/lib/printables.ts
import fs from "fs";
import path from "path";

export type PrintableCategory = "recipes" | "projects" | "field-notes" | "tags";
export type PrintableItem = {
  filename: string; // e.g., "bold-earth-cards.pdf"
  title: string; // e.g., "Bold Earth Cards"
  href: string; // e.g., "/downloads/recipes/bold-earth-cards.pdf"
  category: PrintableCategory;
};

const CATEGORY_DIRS: Record<PrintableCategory, string> = {
  recipes: "recipes",
  projects: "patterns",
  "field-notes": "field-notes",
  tags: "tags",
};

function toTitle(filename: string) {
  const base = filename.replace(/\.pdf$/i, "");
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function listPdfsIn(dirAbs: string) {
  if (!fs.existsSync(dirAbs)) return [] as string[];
  return fs
    .readdirSync(dirAbs)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

/** Returns all printables across categories. */
export function getAllPrintables(): PrintableItem[] {
  const root = path.join(process.cwd(), "public", "downloads");
  const items: PrintableItem[] = [];

  (Object.keys(CATEGORY_DIRS) as PrintableCategory[]).forEach((cat) => {
    const sub = CATEGORY_DIRS[cat];
    const abs = path.join(root, sub);
    const files = listPdfsIn(abs);
    files.forEach((filename) => {
      items.push({
        filename,
        title: toTitle(filename),
        href: `/downloads/${sub}/${filename}`,
        category: cat,
      });
    });
  });

  return items;
}

/** Convenience filters */
export function getPrintablesByCategory(
  category: PrintableCategory
): PrintableItem[] {
  return getAllPrintables().filter((p) => p.category === category);
}
