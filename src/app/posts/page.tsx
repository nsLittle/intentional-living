// src/app/posts/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllPosts from "components/LayoutAllPosts";
import Footer from "components/Footer";
import { isPublished } from "lib/publish";

export default function PostsPage() {
  const dir = path.join(process.cwd(), "src", "content", "posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  type FM = {
    title?: string;
    date?: string;
    hero?: string;
    text?: string;
    published?: boolean;
  };

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return { slug, data: data as FM };
    })
    .filter((p) => isPublished(p.data))
    .sort((a, b) => {
      const ad = Date.parse(a.data?.date ?? "");
      const bd = Date.parse(b.data?.date ?? "");
      if (bd !== ad) return bd - ad;
      const at = String(a.data?.title ?? a.slug);
      const bt = String(b.data?.title ?? b.slug);
      return at.localeCompare(bt, undefined, { sensitivity: "base" });
    })
    .map((p) => ({
      slug: p.slug,
      title: p.data.title ?? p.slug,
      date: p.data.date ?? undefined,
      hero: p.data.hero ?? undefined,
      text: p.data.text ?? undefined,
    }));

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
