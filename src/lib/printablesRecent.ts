// src/lib/printablesRecent.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type CoreFrontmatter = {
  title?: string;
  date?: string;
  hero?: string;
};

const PRINTABLE_TO_SOURCE: Record<
  string,
  { section: "posts" | "recipes" | "crafts"; slug: string }
> = {
  "ballband-pattern": { section: "crafts", slug: "ballband-kitchen-clothes" },
  "bold-earth": { section: "recipes", slug: "bold-earth-spice-mix" },
  "ultimate-brownies": { section: "recipes", slug: "ultimate-brownies" },
  "pussy-hat": { section: "posts", slug: "pussy-hat" },
};

function mdxPathFor(section: "posts" | "recipes" | "crafts", slug: string) {
  return path.join(process.cwd(), "src", "content", section, `${slug}.mdx`);
}

function parseDateLoose(input: unknown): number | null {
  if (typeof input !== "string" || input.trim().length === 0) return null;
  const mmddyyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
  if (mmddyyyy.test(input)) {
    const [, mm, dd, yyyy] = input.match(mmddyyyy)!;
    const iso = `${yyyy}-${mm}-${dd}`;
    const t = Date.parse(iso);
    return Number.isNaN(t) ? null : t;
  }
  const t = Date.parse(input);
  return Number.isNaN(t) ? null : t;
}

/**
 * Given a printable href like "/downloads/patterns/ballband-patterns.pdf",
 * returns { base: "ballband-patterns", slug: "ballband-patterns" } etc.
 */
function slugFromHref(href: string) {
  const name = href.split("/").pop() ?? "";
  const base = name.replace(/\.pdf$/i, "");
  return { base, slug: base };
}

type PrintableInput = {
  title: string;
  href: string; // e.g., /downloads/recipes/bold-earth.pdf
  filename?: string; // optional, if you have it; not required
  category?: string; // "recipes" | "projects" | "tags" (not strictly needed here)
};

export type RecentPrintable = {
  title: string;
  href: string; // link to detail page: /printables/[slug]
  sourceDate?: string; // original date string from the MDX (if exists)
  sortKey: number; // numeric timestamp for sorting (fallback = 0)
};

/**
 * Resolve the MDX date for a printable (via the mapping table).
 * Returns a RecentPrintable with a sortKey suitable for DESC sorting.
 */
export function resolvePrintableToRecent(p: PrintableInput): RecentPrintable {
  const { slug, base } = slugFromHref(p.href);
  const mapping = PRINTABLE_TO_SOURCE[base];
  let sortKey = 0;
  let sourceDate: string | undefined = undefined;
  let recentTitle = p.title;

  if (mapping) {
    const mdxPath = mdxPathFor(mapping.section, mapping.slug);
    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, "utf8");
      const { data } = matter(raw) as { data: CoreFrontmatter };
      // Prefer MDX title if present
      if (data?.title && typeof data.title === "string") {
        recentTitle = data.title;
      }
      // Use MDX date for sorting
      if (data?.date) {
        sourceDate = String(data.date);
        const ts = parseDateLoose(sourceDate);
        if (ts) sortKey = ts;
      }
    }
  }

  return {
    title: recentTitle,
    href: `/printables/${slug}`, // detail page
    sourceDate,
    sortKey,
  };
}

export function computeRecentPrintables(
  all: PrintableInput[],
  limit = 4
): Array<{ title: string; href: string; img?: string }> {
  const enriched = all.map(resolvePrintableToRecent);
  enriched.sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0));
  for (let i = 1; i < enriched.length; i++) {
    if (enriched[i].sortKey === 0 && enriched[i - 1].sortKey === 0) {
      enriched.sort((a, b) => a.title.localeCompare(b.title));
      break;
    }
  }
  return enriched.slice(0, limit).map(({ title, href }) => ({ title, href }));
}

// /downloads/<category>/<name>.pdf -> /downloads/thumbnails/<category>/<name>.webp
function thumbFromPdf(pdf?: string) {
  if (!pdf) return undefined;
  const withoutPrefix = pdf.replace(/^\/downloads\//, "");
  const [category, rest] = withoutPrefix.split("/", 2);
  if (!category || !rest) return undefined;
  const base = rest.replace(/\.pdf$/i, "");
  return `/downloads/thumbnails/${category}/${base}.webp`;
}

/** Most recent printables with thumbnails for the highlights grid */
export function computePrintableHighlights(
  all: Array<{ title: string; href: string }>,
  limit = 4
): Array<{ title: string; href: string; img?: string }> {
  const enriched = all.map((p) => {
    const rec = resolvePrintableToRecent(p as PrintableInput); // ✅ typed, no any
    return {
      title: rec.title,
      href: rec.href,
      img: thumbFromPdf(p.href),
      sortKey: rec.sortKey ?? 0,
    };
  });

  enriched.sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0));
  return enriched
    .slice(0, limit)
    .map(({ title, href, img }) => ({ title, href, img }));
}
