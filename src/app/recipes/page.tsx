// src/app/recipes/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllRecipes from "components/LayoutAllRecipes";
import Footer from "components/Footer";
import { isPublished } from "lib/publish";

export default function RecipesPage() {
  const dir = path.join(process.cwd(), "src", "content", "recipes");
  const files = globSync("**/*.mdx", { cwd: dir });

  type FM = {
    title?: string;
    date?: string;
    hero?: string;
    text?: string;
    published?: boolean;
    tags?: string[];
  };

  const recipes = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return { slug, data: data as FM };
    })
    .filter((r) => isPublished(r.data))
    .sort((a, b) => {
      const ad = Date.parse(a.data?.date ?? "");
      const bd = Date.parse(b.data?.date ?? "");
      if (bd !== ad) return bd - ad;
      const at = String(a.data?.title ?? a.slug);
      const bt = String(b.data?.title ?? b.slug);
      return at.localeCompare(bt, undefined, { sensitivity: "base" });
    })
    .map((r) => ({
      slug: r.slug,
      title: r.data.title ?? r.slug,
      date: r.data.date ?? undefined,
      hero: r.data.hero ?? undefined,
      text: r.data.text ?? undefined,
    }));

  return (
    <div>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllRecipes recipes={recipes} />
      <Footer />
    </div>
  );
}
