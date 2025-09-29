// src/lib/woodland.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type HighlightItem = { title: string; href: string; img?: string };

type Raw = {
  title?: string;
  date?: string;
  hero?: string;
  highlight?: boolean;
};

function collectFrom(dirRel: string, hrefBase: string) {
  const dir = path.join(process.cwd(), "src", "content", dirRel);
  if (!fs.existsSync(dir)) return [] as Array<{ meta: Raw; href: string }>;

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.(mdx?|MDX?)$/, "");
      const filePath = path.join(dir, f);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      const meta = data as Raw;
      return {
        meta,
        href: `${hrefBase}/${slug}`,
      };
    });
}

/**
 * Build Woodland highlights from all Woodland sections.
 * Priority: items with `highlight: true`, otherwise most-recent by `date`.
 * Limit defaults to 4.
 */
export function getWoodlandHighlights(limit = 4): HighlightItem[] {
  const all = [
    ...collectFrom("field-notes", "/woodland/field-notes"),
    ...collectFrom("woodland-crafts", "/woodland/woodland-crafts"),
    ...collectFrom("foraged-recipes", "/woodland/foraged-recipes"),
  ];

  // Split into highlighted vs normal
  const highlighted = all.filter((a) => a.meta.highlight === true);
  const normal = all.filter((a) => a.meta.highlight !== true);

  // Helper to sort by date desc (missing dates last)
  const byDateDesc = (x: (typeof all)[number], y: (typeof all)[number]) => {
    const dx = x.meta.date ? new Date(x.meta.date).getTime() : 0;
    const dy = y.meta.date ? new Date(y.meta.date).getTime() : 0;
    return dy - dx;
  };

  highlighted.sort(byDateDesc);
  normal.sort(byDateDesc);

  const picked = [...highlighted, ...normal].slice(0, limit);

  return picked.map(({ meta, href }) => ({
    title: meta.title ?? href.split("/").pop() ?? "Untitled",
    href,
    img: meta.hero, // if present, DropDownHighLightsGrid will use it
  }));
}
