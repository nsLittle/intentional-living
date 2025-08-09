// src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CollectionType = "posts" | "recipes" | "crafts" | "printables";

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  status?: "published" | "draft";
};

const ROOT = path.join(process.cwd(), "src", "content");

function dirFor(type: CollectionType) {
  return path.join(ROOT, type);
}

export function getCollection(
  type: CollectionType,
  limit?: number
): PostMeta[] {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"));

  const items: PostMeta[] = files.map((file) => {
    const filePath = path.join(dir, file.name);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const slug = file.name.replace(/\.mdx$/, "");
    return {
      slug,
      title: data.title ?? slug,
      date: data.date,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      tags: data.tags ?? [],
      status: data.status ?? "published",
    };
  });

  const published = items.filter((i) => i.status !== "draft");

  const sorted = published.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getHighlights(type: CollectionType, limit = 2): PostMeta[] {
  const all = getCollection(type);
  const withImg = all.filter((p) => !!p.coverImage).slice(0, limit);
  if (withImg.length >= limit) return withImg;

  const need = limit - withImg.length;
  const rest = all
    .filter((p) => !withImg.some((x) => x.slug === p.slug))
    .slice(0, need);

  return [...withImg, ...rest];
}
