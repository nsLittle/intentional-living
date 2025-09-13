// src/lib/searchIndex.ts
import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import strip from "strip-markdown";
import remarkStringify from "remark-stringify";

export type BuiltItem = {
  title: string;
  href: string;
  kind: "post" | "recipe" | "craft" | "page";
  summary?: string;
  tags?: string[];
  date?: string;
};

export async function buildSearchIndex(): Promise<BuiltItem[]> {
  const cwd = process.cwd();
  const files = await fg(["src/content/**/*.mdx", "src/content/**/*.md"], {
    cwd,
    dot: false,
    ignore: ["**/node_modules/**", "**/_*.*"],
  });

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(strip)
    .use(remarkStringify);

  const items: BuiltItem[] = [];

  for (const rel of files) {
    const abs = path.join(cwd, rel);
    const raw = await fs.readFile(abs, "utf8");
    const { data, content } = matter(raw);

    const file = await processor.process(content);
    const plain = String(file).replace(/\s+/g, " ").trim();

    const slug = rel.replace(/^src\/content\//, "").replace(/\.(mdx?|md)$/, "");
    const href = "/" + slug;

    const seg = slug.split("/")[0];
    const kind: BuiltItem["kind"] =
      seg === "posts"
        ? "post"
        : seg === "recipes"
        ? "recipe"
        : seg === "crafts"
        ? "craft"
        : "page";

    const title =
      (typeof data.title === "string" && data.title) ||
      slug.split("/").pop()!.replace(/-/g, " ");

    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : undefined;

    items.push({
      title,
      href,
      kind,
      summary:
        (typeof data.summary === "string" && data.summary) ||
        (typeof data.description === "string" && data.description) ||
        plain.slice(0, 240),
      tags,
      date: typeof data.date === "string" ? data.date : undefined,
    });
  }

  return items;
}
