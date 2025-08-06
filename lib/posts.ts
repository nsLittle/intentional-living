import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content");

export async function getPostBySlug(slug: string): Promise<{
  slug: string;
  contentHtml: string;
  title: string;
  date?: string;
}> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const typedData = data as { title: string; date?: string };

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...typedData,
  };
}

export async function getAllPostSlugs() {
  const filenames = await fs.promises.readdir(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export function getSortedPosts(limit = 3) {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf8"
    );
    const { data } = matter(fileContents);
    return {
      slug,
      ...data,
    };
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}
