import fs from "fs";
import path from "path";
import matter from "gray-matter";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllPosts from "components/LayoutAllPosts";
import Footer from "components/Footer";

export default function CraftyPostsPage() {
  const dir = path.join(process.cwd(), "src", "content", "posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const allPosts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    const tags = Array.isArray(data.tags) ? data.tags : [];

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? undefined,
      hero: data.hero ?? undefined,
      text: data.text ?? undefined,
      tags,
    };
  });

  const craftyPosts = allPosts.filter((p) => p.tags.includes("crafts"));

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            Posts about Crafty Projects
          </h1>
        </div>
      </div>
      <LayoutAllPosts posts={craftyPosts} />
      <Footer />
    </>
  );
}
