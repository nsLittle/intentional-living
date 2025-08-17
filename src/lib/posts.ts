// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostItem = {
  title: string;
  href: string;
  date?: string;
};

export type PostLink = {
  title: string;
  href: string;
  img?: string;
  date?: string;
};

export function getLatestPost() {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  const filenames = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);

  const posts = filenames.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ""),
      title: data.title || filename,
      date: new Date(data.date),
      text: data.text ? data.text.slice(0, 200).trim() + "..." : "",
      hero: data.hero || null,
    };
  });

  const sorted = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return sorted[0];
}

export function getRecentPosts(limit = 5): PostItem[] {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(contentDir)) return [];

  const filenames = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name);

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
      title: data?.title ?? slug,
      href: `/posts/${slug}`,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } as any;
  });

  return items
    .sort((a, b) => b._sort - a._sort)
    .slice(0, limit)
    .map(({ _sort, ...rest }) => rest);
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
    const { data } = matter(raw);

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const slug = filename.replace(/\.mdx?$/, "");

    // hero comes from frontmatter; can be relative or absolute
    const hero =
      typeof data?.hero === "string" && data.hero.trim().length > 0
        ? data.hero.trim()
        : undefined;

    return {
      title: (data?.title as string) ?? slug,
      href: `/posts/${slug}`,
      img: hero, // let HighlightsGrid normalize leading slash
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } as any;
  });

  return items
    .sort((a, b) => b._sort - a._sort)
    .slice(0, limit)
    .map(({ _sort, ...rest }) => rest);
}
