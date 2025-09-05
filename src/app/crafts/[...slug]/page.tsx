// src/app/crafts/[...slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { globSync } from "glob";
import LayoutRecipe from "components/LayoutRecipe";

const CRAFTS_DIR = path.join(process.cwd(), "src", "content", "crafts");

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
  params: { slug: string | string[] };
}) {
  const { slug: slugParam } = await params;
  const slugParts = Array.isArray(slugParam) ? slugParam : [slugParam];
  if (!slugParts.length) return notFound();

  const filePath = path.join(CRAFTS_DIR, ...slugParts) + ".mdx";

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return notFound();
  }

  const { content, data } = matter(fileContent);

  const title = (data.title as string) ?? slugParts[slugParts.length - 1];
  const date =
    typeof data.date === "string" ? (data.date as string) : undefined;
  const hero =
    typeof data.hero === "string" ? (data.hero as string) : undefined;
  const text =
    typeof data.text === "string" ? (data.text as string) : undefined;

  return (
    <LayoutRecipe title={title} date={date} hero={hero} text={text}>
      <MDXRemote source={content} />
    </LayoutRecipe>
  );
}
