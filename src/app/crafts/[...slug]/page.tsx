// src/app/crafts/[...slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { globSync } from "glob";
import LayoutCraft from "components/LayoutCraft";

const CRAFTS_DIR = path.join(process.cwd(), "src", "content", "crafts");

// type PageProps = {
//   params: { slug: string[] };
// };

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

export default async function CraftPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugParts = Array.isArray(slug) ? slug : [slug];
  if (!slugParts.length) return notFound();

  const filePath = path.join(CRAFTS_DIR, ...slugParts) + ".mdx";

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return notFound();
  }

  const { content, data } = matter(fileContent);
  const fm = data as {
    title?: string;
    date?: string;
    hero?: string;
    text?: string;
    pdf?: string;
    tags?: string[];
  };

  const title = fm.title ?? slugParts[slugParts.length - 1];

  return (
    <div className="prose max-w-none px-0 py-0">
      <LayoutCraft
        title={title}
        date={fm.date}
        hero={fm.hero}
        text={fm.text}
        pdf={fm.pdf}>
        <MDXRemote source={content} />
      </LayoutCraft>
    </div>
  );
}
