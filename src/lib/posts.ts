import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getLatestPost() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const filenames = fs.readdirSync(contentDir);

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
