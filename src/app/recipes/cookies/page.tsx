import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllRecipes from "components/LayoutAllRecipes";
import Footer from "components/Footer";

const RECIPES_DIR = path.join(process.cwd(), "src", "content", "recipes");

export default function cookiesRecipesPage() {
  const files = globSync("**/*.mdx", { cwd: RECIPES_DIR });

  const allRecipes = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(RECIPES_DIR, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    const tags: string[] = Array.isArray(data.tags)
      ? data.tags.map(String)
      : [];

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: typeof data.date === "string" ? data.date : undefined,
      hero: typeof data.hero === "string" ? data.hero : undefined,
      text: (data.text as string) ?? (data.description as string) ?? undefined,
      tags,
    };
  });

  const cookiesRecipes = allRecipes.filter((r) => r.tags.includes("cookies"));

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllRecipes heading="Cookies Recipes" recipes={cookiesRecipes} />
      <Footer />
    </>
  );
}
