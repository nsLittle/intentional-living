// src/app/posts/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllPosts from "components/LayoutAllPosts";
import LinkReturnHome from "components/LinkReturnHome";
import Footer from "components/Footer";

export default function PostsPage() {
  const dir = path.join(process.cwd(), "src", "content", "posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? undefined,
      hero: data.hero ?? undefined,
      text: data.text ?? undefined,
    };
  });

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            All Posts
          </h1>
        </div>
      </div>
      <LayoutAllPosts posts={posts} />
      <Footer />
    </>
  );
}
