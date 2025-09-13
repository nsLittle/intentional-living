// src/app/api/search-index/route.ts
import { NextResponse } from "next/server";
import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import strip from "strip-markdown";
import remarkStringify from "remark-stringify";

export const dynamic = "force-static"; // cache this GET response as a static asset
export const revalidate = 3600; // (optional) rebuild every hour if redeployed

type IndexItem = {
  title: string;
  href: string;
  kind: "post" | "recipe" | "craft" | "page";
  summary?: string;
  tags?: string[];
  date?: string;
};

export async function GET() {
  const cwd = process.cwd();

  // Find all MD/MDX files under your content root.
  const files = await fg(["src/content/**/*.mdx", "src/content/**/*.md"], {
    cwd,
    dot: false,
    ignore: ["**/node_modules/**", "**/_*.*"], // ignore temp/partial files
  });

  // Build one processor to convert MDX -> plain text
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(strip) // remove markdown formatting
    .use(remarkStringify); // stringify plain text output

  const items: IndexItem[] = [];

  for (const rel of files) {
    const abs = path.join(cwd, rel);
    const raw = await fs.readFile(abs, "utf8");

    // Gray-matter parses front-matter cleanly. :contentReference[oaicite:2]{index=2}
    const { data, content } = matter(raw);

    // Convert MDX content to plain text for searching.
    const file = await processor.process(content);
    const plain = String(file).replace(/\s+/g, " ").trim();

    // Derive slug and href from file path: src/content/<slug>.mdx -> /<slug>
    const slug = rel.replace(/^src\/content\//, "").replace(/\.(mdx?|md)$/, "");
    const href = "/" + slug;

    // Infer kind from the first path segment (customize to your folders)
    const seg = slug.split("/")[0];
    const kind: IndexItem["kind"] =
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

  return NextResponse.json({ items });
}
