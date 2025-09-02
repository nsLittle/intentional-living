// src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

export type CollectionType = "posts" | "recipes" | "crafts" | "printables";

export type PostMeta = {
  slug: string;
  title: string;
  date?: string; // ISO string if present
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  status?: "published" | "draft";
};

const ROOT = path.join(process.cwd(), "src", "content");

function dirFor(type: CollectionType) {
  return path.join(ROOT, type);
}

function normalizeSlug(filePath: string): string {
  return filePath
    .replace(/\.mdx$/i, "")
    .split(path.sep)
    .join("/");
}

function parseDate(input: unknown): Date | undefined {
  if (typeof input !== "string") return undefined;
  const d = new Date(input);
  return isNaN(d.getTime()) ? undefined : d;
}

export function getCollection(
  type: CollectionType,
  limit?: number
): PostMeta[] {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];

  const files = globSync("**/*.mdx", { cwd: dir, nodir: true });

  const items = files.map((relative) => {
    const slug = normalizeSlug(relative);
    const raw = fs.readFileSync(path.join(dir, relative), "utf8");
    const { data } = matter(raw);
    const fm = data as Record<string, unknown>;

    const d = parseDate(fm.date);

    const status: "draft" | "published" =
      fm.status === "draft" ? "draft" : "published";

    return {
      slug,
      title: (fm.title as string) ?? slug,
      date: d ? d.toISOString() : undefined,
      excerpt:
        (fm.excerpt as string) ??
        (fm.text as string) ??
        (fm.description as string),
      coverImage: (fm.coverImage as string) ?? (fm.hero as string),
      tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
      status,
    };
  });

  // drafts out
  const published = items.filter((i) => i.status === "published");

  // sort: date desc, then title asc, undated last
  published.sort((a, b) => {
    if (a.date && b.date) {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (da !== db) return db - da;
      return a.title.localeCompare(b.title);
    }
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.title.localeCompare(b.title);
  });

  return typeof limit === "number" ? published.slice(0, limit) : published;
}
