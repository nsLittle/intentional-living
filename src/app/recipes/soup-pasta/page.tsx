// src/app/recipes/soup-pasta/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllRecipes from "components/LayoutAllRecipes";
import Footer from "components/Footer";

const RECIPES_DIR = path.join(process.cwd(), "src", "content", "recipes");

export default function SoupPastaRecipesPage() {
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
      text:
        (data.text as string) ??
        (data.description as string) ??
        (data["text too"] as string) ??
        undefined,
      tags,
    };
  });

  const soupPastaRecipes = allRecipes
    .filter((r) => r.tags.includes("soup-pasta"))
    .sort((a, b) => {
      const ad = Date.parse(a.date ?? "");
      const bd = Date.parse(b.date ?? "");
      if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0); // newer first
      const at = (a.title ?? a.slug ?? "").toString();
      const bt = (b.title ?? b.slug ?? "").toString();
      return at.localeCompare(bt, undefined, { sensitivity: "base" });
    });

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllRecipes
        heading="Soup & Pasta Recipes"
        recipes={soupPastaRecipes}
      />
      <Footer />
    </>
  );
}
