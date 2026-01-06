// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isPublished } from "./publish";

export type PostItem = {
  title: string;
  href: string;
  date?: string;
};

type PostListItem = {
  title: string;
  href: string;
  date: string;
  _sort: number;
  img?: string | null;
};

type PostFrontMatter = {
  title?: string;
  date?: string;
  text?: string;
  hero?: string;
  published?: boolean;
  // add other known fields as you introduce them
};

type LatestPostItem = {
  data: PostFrontMatter;
  slug: string;
  title: string;
  date: Date;
  text: string;
  hero: string | null;
  _sort: number;
};

export type PostLink = {
  title: string;
  href: string;
  img?: string;
  date?: string;
};

export function getLatestPost() {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(contentDir)) return null;

  const filenames = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);

  const items = filenames.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw) as { data: PostFrontMatter };

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const slug = filename.replace(/\.mdx?$/, "");

    return {
      data,
      slug,
      title: data.title ?? slug,
      date: dateObj,
      text:
        typeof data.text === "string" && data.text.trim().length > 0
          ? `${data.text.trim().slice(0, 200)}...`
          : "",
      hero:
        typeof data.hero === "string" && data.hero.trim().length > 0
          ? data.hero.trim()
          : null,
      _sort: dateObj.getTime(),
    } satisfies LatestPostItem;
  });

  const latest = items
    .filter((it) => isPublished(it.data)) // ✅ gate with isPublished
    .sort((a, b) => b._sort - a._sort)[0];

  if (!latest) return null;

  // Return only what the component needs
  const { slug, title, date, text, hero } = latest;
  return { slug, title, date, text, hero };
}

export function getRecentPosts(limit = 5): PostItem[] {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(contentDir)) return [];

  const filenames = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);

  // Build with full front-matter, then filter with isPublished, then sort/slice/map
  const items = filenames.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const slug = filename.replace(/\.mdx?$/, "");

    return {
      data, // keep front-matter so we can call isPublished
      title: data?.title ?? slug,
      href: `/posts/${slug}`,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } satisfies PostListItem & { data: PostFrontMatter };
  });

  // TEMP DEBUG: see what isPublished thinks about each item
  items.forEach((it) => {
    if (it.title.toLowerCase().includes("chanterelle")) {
      // surface exactly what's in front-matter
      // eslint-disable-next-line no-console
    }
  });

  return items
    .filter((it) => isPublished(it.data)) // 🔒 only published & not future-dated
    .sort((a, b) => {
      // Primary: newest first
      if (b._sort !== a._sort) return b._sort - a._sort;
      // Secondary: title A→Z
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    })
    .slice(0, limit)
    .map(({ title, href, date }) => ({ title, href, date }));
}

export function getPostHighlights(limit = 4): PostLink[] {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(contentDir)) return [];

  const filenames = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);

  const items = filenames.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw) as { data: PostFrontMatter };

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const slug = filename.replace(/\.mdx?$/, "");
    const hero =
      typeof data?.hero === "string" && data.hero.trim().length > 0
        ? data.hero.trim()
        : undefined;

    return {
      data, // keep for isPublished
      title: (data?.title as string) ?? slug,
      href: `/posts/${slug}`,
      img: hero,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } satisfies PostListItem & { data: PostFrontMatter };
  });

  return items
    .filter((it) => isPublished(it.data)) // ✅ boolean-only gate
    .sort((a, b) => {
      if (b._sort !== a._sort) return b._sort - a._sort; // newest → oldest
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" }); // A→Z
    })
    .slice(0, limit)
    .map(({ title, href, img, date }) => ({ title, href, img, date }));
}
