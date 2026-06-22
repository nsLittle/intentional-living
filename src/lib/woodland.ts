// src/lib/woodland.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type HighlightItem = { title: string; href: string; img?: string };

type Raw = {
  title?: string;
  date?: string;
  hero?: string;
  text?: string;
  highlight?: boolean;
  published?: boolean;
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

import { isPublished } from "./publish"; // top of file (ensure this import exists)

export function getLatestWoodland(): {
  href: string;
  title: string;
  date: Date;
  hero: string | null;
  text: string;
} | null {
  // Directly read files so we can compute a robust sort timestamp
  const groups = [
    { dirRel: "field-notes", hrefBase: "/woodland/field-notes" },
    { dirRel: "woodland-crafts", hrefBase: "/woodland/woodland-crafts" },
    { dirRel: "foraged-recipes", hrefBase: "/woodland/foraged-recipes" },
  ];

  const entries: Array<{
    meta: Raw;
    href: string;
    _sort: number;
    dateObj: Date;
    title: string;
    hero: string | null;
    text: string;
  }> = [];

  for (const g of groups) {
    const dir = path.join(process.cwd(), "src", "content", g.dirRel);
    if (!fs.existsSync(dir)) continue;

    for (const f of fs.readdirSync(dir)) {
      if (!/\.(mdx?|MDX?)$/.test(f)) continue;

      const slug = f.replace(/\.(mdx?|MDX?)$/, "");
      const filePath = path.join(dir, f);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      const meta = (data ?? {}) as Raw;

      // Build date with fallback to file mtime
      const stat = fs.statSync(filePath);
      const parsed =
        typeof meta.date === "string" ? new Date(meta.date) : undefined;
      const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

      const href = `${g.hrefBase}/${slug}`;
      const title = meta.title ?? slug;
      const hero =
        typeof meta.hero === "string" && meta.hero.trim()
          ? meta.hero.trim()
          : null;

      const text =
        typeof meta.text === "string" && meta.text.trim()
          ? meta.text.trim()
          : "";

      // Respect drafts if present (and SHOW_DRAFTS flags off)
      if (!isPublished(meta)) continue;

      entries.push({
        meta,
        href,
        _sort: dateObj.getTime(),
        dateObj,
        title,
        hero,
        text,
      });
    }
  }

  if (entries.length === 0) return null;

  entries.sort((a, b) => b._sort - a._sort);
  const latest = entries[0];

  return {
    href: latest.href,
    title: latest.title,
    date: latest.dateObj,
    hero: latest.hero,
    text: latest.text,
  };
}

export function getAllWoodlands() {
  const groups = [
    { dirRel: "field-notes", hrefBase: "/woodland/field-notes" },
    { dirRel: "woodland-crafts", hrefBase: "/woodland/woodland-crafts" },
    { dirRel: "foraged-recipes", hrefBase: "/woodland/foraged-recipes" },
  ];

  return groups.flatMap((g) => {
    const dir = path.join(process.cwd(), "src", "content", g.dirRel);
    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter((f) => /\.(mdx?|MDX?)$/.test(f))
      .map((f) => {
        const slug = f.replace(/\.(mdx?|MDX?)$/, "");
        const filePath = path.join(dir, f);
        const raw = fs.readFileSync(filePath, "utf8");
        const { data } = matter(raw);
        const meta = (data ?? {}) as Raw;

        return {
          slug,
          href: `${g.hrefBase}/${slug}`,
          title: meta.title ?? slug,
          date: meta.date ?? fs.statSync(filePath).mtime.toISOString(),
          hero: meta.hero,
          text: meta.text,
          published: meta.published,
        };
      });
  });
}
