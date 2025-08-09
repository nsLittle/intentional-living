import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import LayoutPost from "components/LayoutPost";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "posts",
    `${params.slug}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);

  return (
    <div className="prose mx-auto px-6 py-12">
      <LayoutPost
        title={data.title}
        date={data.date}
        hero={data.hero}
        text={data.text}>
        <MDXRemote source={content} />
      </LayoutPost>
    </div>
  );
}
