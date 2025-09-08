// src/app/crafts/[...slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { globSync } from "glob";
import LayoutCraft from "components/LayoutCraft";

const CRAFTS_DIR = path.join(process.cwd(), "src", "content", "crafts");

type PageProps = {
  params: { slug: string[] };
};

type CraftFrontMatter = {
  title?: string;
  date?: string;
  hero?: string;
  text?: string;
  pdf?: string;
  tags?: string[];
};

// Pre-build /crafts routes
export function generateStaticParams() {
  const files = globSync("**/*.mdx", { cwd: CRAFTS_DIR });
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, "").split("/"),
  }));
}

export default function CraftPage({ params }: PageProps) {
  const slugParts = Array.isArray(params.slug) ? params.slug : [params.slug];
  if (!slugParts.length) return notFound();

  const filePath = path.join(CRAFTS_DIR, ...slugParts) + ".mdx";

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return notFound();
  }

  const { content, data } = matter(fileContent);
  const fm = data as unknown as CraftFrontMatter;

  const title = fm.title ?? slugParts[slugParts.length - 1];
  const date = fm.date;
  const hero = fm.hero;
  const text = fm.text;
  const pdf = fm.pdf;

  return (
    <div className="prose max-w-none px-0 py-0">
      <LayoutCraft title={title} date={date} hero={hero} text={text} pdf={pdf}>
        <MDXRemote source={content} />
      </LayoutCraft>
    </div>
  );
}
