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

type PostFrontMatter = {
  title?: string;
  date?: string;
  text?: string;
  hero?: string;
  published?: boolean;
};

export type PostLink = {
  title: string;
  href: string;
  img?: string;
  date?: string;
};

type NoteRow = {
  data: PostFrontMatter;
  title: string;
  href: string;
  date: string;
  _sort: number;
  img?: string;
};

const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");

const walkMdxFiles = (dir: string): string[] => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walkMdxFiles(full);
    return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
  });
};

const buildNoteRows = (): NoteRow[] => {
  const files = walkMdxFiles(NOTES_DIR);

  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw) as { data: PostFrontMatter };

    // slug relative to notes root (supports nested)
    const rel = path.relative(NOTES_DIR, filePath);
    const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const hero =
      typeof data?.hero === "string" && data.hero.trim().length > 0
        ? data.hero.trim()
        : undefined;

    return {
      data,
      title: data?.title ?? slug,
      href: `/notes/${slug}`,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
      img: hero,
    };
  });
};

export function getLatestPost() {
  if (!fs.existsSync(NOTES_DIR)) return null;

  // pick latest published row
  const latest = buildNoteRows()
    .filter((it) => isPublished(it.data))
    .sort((a, b) => b._sort - a._sort)[0];

  if (!latest) return null;

  // read the actual file content to build an excerpt
  const filePath = path.join(
    NOTES_DIR,
    latest.href.replace(/^\/notes\//, "") + ".mdx"
  );

  let excerpt = "";

  // 1) Prefer frontmatter text (most reliable)
  if (
    typeof latest.data?.text === "string" &&
    latest.data.text.trim().length > 0
  ) {
    const t = latest.data.text.trim().replace(/\s+/g, " ");
    excerpt = t.length > 250 ? t.slice(0, 250).trimEnd() + "…" : t;
  } else {
    // 2) Fallback: strip from MDX body
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);

      const plain = parsed.content
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
        .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
        .replace(/[#>*_`~-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      excerpt =
        plain.length > 100 ? plain.slice(0, 250).trimEnd() + "…" : plain;
    } catch {
      excerpt = "";
    }
  }

  return {
    slug: latest.href.replace(/^\/notes\//, ""),
    title: latest.title,
    date: new Date(latest.date),
    text: excerpt, // now a plain-text excerpt
    hero: latest.img ?? null,
  };
}

export function getRecentPosts(limit = 5): PostItem[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return buildNoteRows()
    .filter((it) => isPublished(it.data))
    .sort((a, b) => {
      if (b._sort !== a._sort) return b._sort - a._sort;
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    })
    .slice(0, limit)
    .map(({ title, href, date }) => ({ title, href, date }));
}

export function getPostHighlights(limit = 4): PostLink[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return buildNoteRows()
    .filter((it) => isPublished(it.data))
    .sort((a, b) => {
      if (b._sort !== a._sort) return b._sort - a._sort;
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    })
    .slice(0, limit)
    .map(({ title, href, img, date }) => ({ title, href, img, date }));
}
